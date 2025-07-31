document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    // display products
    function loadProducts() {
        fetch('../php/displayproducts.php')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';

                data.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'product-item';
                    productItem.dataset.productId = product.productID;
                    productItem.innerHTML = `
                        <img src="${product.imageURL}" alt="${product.productName}">
                        <h3>${product.productName}</h3>
                        <p>Price: ₱${product.price} per ${product.unitType}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    `;
                    productList.appendChild(productItem);

                    // image pop up onclick
                    const img = productItem.querySelector('img');
                    img.addEventListener('click', function () {
                        const overlay = document.createElement('div');
                        overlay.className = 'image-overlay';

                        const fullImage = document.createElement('img');
                        fullImage.src = img.src;
                        fullImage.alt = img.alt;

                        overlay.appendChild(fullImage);
                        document.body.appendChild(overlay);

                        overlay.addEventListener('click', function () {
                            document.body.removeChild(overlay);
                        });
                    });
                });
            })
            .catch(error => console.error('Error loading products:', error));
    }

    loadProducts();


// Create order modal 
if (!document.getElementById('order-modal')) {
    const orderModal = document.createElement('div');
    orderModal.id = 'order-modal';
    orderModal.style.display = 'none';
    orderModal.innerHTML = `
        <div class="order-modal-content">
            <span class="close-order-modal" style="cursor:pointer;float:right;font-size:24px;">&times;</span>
            <h2>Order Details</h2>
            <div id="order-product-info"></div>
            <form id="order-form">
                <label>Quantity: <input type="number" id="order-quantity" min="0.01" step="0.01" required></label><br>
                <div id="order-total"></div>
                <label>Customer Name: <input type="text" id="customer-name" required></label><br>
                <label>Contact Number: <input type="text" id="customer-contact" maxlength="10" required></label><br>
                <button type="submit">Confirm Order</button>
            </form>
        </div>
    `;
    document.body.appendChild(orderModal);
}

function openOrderModal(product) {
    const orderModal = document.getElementById('order-modal');
    const orderProductInfo = document.getElementById('order-product-info');
    const orderQuantity = document.getElementById('order-quantity');
    const orderTotal = document.getElementById('order-total');
    const orderForm = document.getElementById('order-form');

    // Set up product info
    orderProductInfo.innerHTML = `
        <img src="${product.imageURL}" alt="${product.productName}" style="max-width:100px;max-height:100px;">
        <h3>${product.productName}</h3>
        <p>Price: ₱${product.price} per ${product.unitType}</p>
    `;
    // Store productID for order submission
    orderForm.dataset.productId = product.productID;

    // Set quantity input type
    if (product.unitType.toLowerCase() === 'kilo') {
        orderQuantity.step = '0.01';
        orderQuantity.min = '0.01';
        orderQuantity.value = '1.00';
    } else {
        orderQuantity.step = '1';
        orderQuantity.min = '1';
        orderQuantity.value = '1';
    }

    // Calculate and display total price
    function updateTotal() {
        let qty = parseFloat(orderQuantity.value) || 0;
        if (qty < parseFloat(orderQuantity.min)) qty = parseFloat(orderQuantity.min);
        const total = qty * parseFloat(product.price);
        orderTotal.textContent = `Total: ₱${total.toFixed(2)}`;
    }
    orderQuantity.addEventListener('input', updateTotal);
    updateTotal();

    // Show modal
    orderModal.style.display = 'flex';

    // Close modal
    orderModal.querySelector('.close-order-modal').onclick = function() {
        orderModal.style.display = 'none';
        orderForm.reset();
    };

    // Form submit
    orderForm.onsubmit = function(e) {
        e.preventDefault();
        // Validation
        const name = document.getElementById('customer-name').value.trim();
        const contact = document.getElementById('customer-contact').value.trim();
        const qty = orderQuantity.value;
        if (!/^[A-Za-z ]+$/.test(name)) {
            alert('Customer name must contain letters and spaces only.');
            return;
        }
        if (!/^\d{10}$/.test(contact)) {
            alert('Contact number must be exactly 10 digits.');
            return;
        }
        // Save order to DB
        const orderData = new FormData();
        orderData.append('productID', orderForm.dataset.productId || product.productID || product.id || '');
        orderData.append('productName', product.productName);
        orderData.append('quantity', qty);
        orderData.append('unitType', product.unitType);
        orderData.append('price', product.price);
        orderData.append('customerName', name);
        orderData.append('customerContact', contact);

        fetch('../php/saveOrder.php', {
            method: 'POST',
            body: orderData
        })
        .then(response => response.text())
        .then(result => {
            alert('Order Confirmed!');
            orderModal.style.display = 'none';
            orderForm.reset();
            window.location.reload();
        })
        .catch(error => {
            alert('Error saving order.');
        });
    };
}
});

// Cart logic
let cart = [];

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.productName} - ₱${item.price} x ${item.quantity}</span>
            <button class="remove-from-cart" data-idx="${idx}">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: ₱${total.toFixed(2)}`;
}

document.getElementById('open-cart-btn').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'flex';
    renderCart();
});

document.getElementById('close-cart-btn').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Add to cart and view order functionality
document.addEventListener('click', function(event) {
    // Add to Cart
    if (event.target.classList.contains('add-to-cart')) {
        const productItem = event.target.closest('.product-item');
        const productID = productItem.dataset.productId;
        const productName = productItem.querySelector('h3').textContent;
        const price = parseFloat(productItem.querySelector('p').textContent.replace(/[^0-9.-]+/g, ""));
        const unitType = productItem.querySelector('p').textContent.toLowerCase().includes('kilo') ? 'Kilo' : 'Pack';
        const imageURL = productItem.querySelector('img').src;
        const quantity = 1; // Default quantity

        const existingItem = cart.find(item => item.productID === productID);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productID, productName, price, quantity, unitType, imageURL });
        }
        renderCart();
        alert(`${productName} has been added to your cart.`);
    }
    // Remove from cart
    if (event.target.classList.contains('remove-from-cart')) {
        const idx = parseInt(event.target.getAttribute('data-idx'));
        cart.splice(idx, 1);
        renderCart();
    }
    // View Order
    if (event.target.classList.contains('view-order')) {
        const productItem = event.target.closest('.product-item');
        const productName = productItem.querySelector('h3').textContent;
        const price = parseFloat(productItem.querySelector('p').textContent.replace(/[^0-9.-]+/g, ""));
        const unitType = productItem.querySelector('p').textContent.toLowerCase().includes('kilo') ? 'Kilo' : 'Pack';
        const imageURL = productItem.querySelector('img').src;
        openOrderModal({ productName, price, unitType, imageURL });
    }
});

// Cart user form validation
document.getElementById('cart-user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cart-fullname').value.trim();
    const phone = document.getElementById('cart-phone').value.trim();
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert('Full name must contain letters and spaces only.');
        return;
    }
    if (!/^\d{10,11}$/.test(phone)) {
        alert('Phone number must be 10 or 11 digits.');
        return;
    }

    // Send the entire cart as JSON
    fetch('../php/saveOrder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customerName: name,
            customerContact: phone,
            cart: cart.map(item => ({
                productID: item.productID,
                quantity: item.quantity
            }))
        })
    })
    .then(response => response.text())
    .then(result => {
        // Show browser notification for successful order
        if (window.Notification && Notification.permission === 'granted') {
            new Notification('Order Confirmed', { body: 'Your order was placed successfully!' });
        } else if (window.Notification && Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    new Notification('Order Confirmed', { body: 'Your order was placed successfully!' });
                } else {
                    alert('Order confirmed!');
                }
            });
        } else {
            alert('Order confirmed!');
        }
        document.getElementById('cart-modal').style.display = 'none';
        cart = [];
        renderCart();
        document.getElementById('cart-user-form').reset();
    })
    .catch(error => {
        alert('Error saving order.');
    });
});