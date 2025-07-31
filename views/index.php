<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fresh Farms Market</title>
    <link rel="stylesheet" href="../styles/styles.css">
</head>


<body>


    <header class="main-header">
        <h1 class="main-title">Fresh Farms Market</h1>
        <button class="view-orders" id="open-cart-btn">View Orders</button>
    </header>

    <main>
        <h2>Buy fresh produce at affordable prices</h2>
    </main>



    <div class="product-grid" id="product-list"></div>

    <!-- Cart Modal -->
    <div class="cart-modal" id="cart-modal">
        <div class="modal-content">
            <span class="close-modal" id="close-cart-btn">&times;</span>
            <h2>Your Cart</h2>
            <ul id="cart-items"></ul>
            <div id="cart-total">Total: ₱0.00</div>
            <form id="cart-user-form">
                <label for="cart-fullname">Full Name:</label>
                <input type="text" id="cart-fullname" name="cart-fullname" required pattern="[A-Za-z ]+">
                <label for="cart-phone">Phone Number:</label>
                <input type="text" id="cart-phone" name="cart-phone" required pattern="\d{10,11}" maxlength="11">
                <button type="submit">Confirm Order</button>
            </form>
        </div>
    </div>

    </div>

<script src="../scripts/scripts.js"></script>

</body>
</html>