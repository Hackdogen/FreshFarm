//modal form for adding products

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const addForm = document.getElementById('addproductform');
    const imageInput = document.getElementById('image');
    const previewImage = document.getElementById('preview');
    const openBtn = document.querySelector('.add-products');
    const closeBtn = document.querySelector('.close-modal');
    const productList = document.getElementById('product-list');

    function openmodal() {
        modal.style.display = 'flex';
    }

    function closemodal() {
        modal.style.display = 'none';
        addForm.reset();
        previewImage.style.display = 'none';
        previewImage.src = '';
    }

    openBtn.addEventListener('click', openmodal);
    closeBtn.addEventListener('click', closemodal);

    imageInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = '';
            previewImage.style.display = 'none';
        }
    });

  // add products to the database
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(addForm);

        fetch('../php/addProducts.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            previewImage.style.display = 'none';
            previewImage.src = '';
            modal.style.display = 'none';
            addForm.reset();
            loadProducts(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the product.');
        });
    });

    // display products
    function loadProducts() {
        fetch('../php/displayproducts.php')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';

                data.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'product-item';
                    productItem.innerHTML = `
                        <img src="${product.imageURL}" alt="${product.productName}">
                        <h3>${product.productName}</h3>
                        <p>Price: $${product.price} per ${product.unitType}</p>
                        <button class="add-to-cart" >Add to Cart</button>
                    `;
                    productList.appendChild(productItem);

                    // Aomage pop up onclick
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
});
