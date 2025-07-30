<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fresh Farms Market</title>
    <link rel="stylesheet" href="../styles/styles.css">
</head>


<body>


    <header style="display: flex; align-items: center; justify-content: space-between; padding: 0 24px;">
        <h1 style="margin: 0;">Fresh Farms Market</h1>
        <button class="view-orders" id="open-cart-btn" style="margin-left: auto; padding: 10px 18px; border-radius: 5px; border: 1px solid #388e3c; background: #43a047; color: #fff; font-weight: bold; cursor: pointer;">View Orders</button>
    </header>

    <main>
        <h2>Buy fresh produce at affordable prices</h2>
    </main>




    <div class="product-grid" id="product-list"></div>

    <!-- Cart Modal -->
    <div class="cart-modal" id="cart-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.4); align-items:center; justify-content:center; z-index:2000;">
        <div class="modal-content" style="min-width:320px; max-width:95vw; background:#fff; border-radius:10px; padding:24px 18px 18px 18px; position:relative;">
            <span class="close-modal" id="close-cart-btn" style="position:absolute; top:12px; right:18px; font-size:28px; color:#888; cursor:pointer;">&times;</span>
            <h2>Your Cart</h2>
            <ul id="cart-items" style="list-style:none; padding:0; margin-bottom:16px;"></ul>
            <div id="cart-total" style="font-weight:bold; margin-bottom:18px;">Total: ₱0.00</div>
            <form id="cart-user-form">
                <label for="cart-fullname">Full Name:</label>
                <input type="text" id="cart-fullname" name="cart-fullname" required pattern="[A-Za-z ]+" style="width:100%; margin-bottom:10px;">
                <label for="cart-phone">Phone Number:</label>
                <input type="text" id="cart-phone" name="cart-phone" required pattern="\d{10,11}" maxlength="11" style="width:100%; margin-bottom:10px;">
                <button type="submit" style="width:100%; background:#43a047; color:#fff; padding:10px 0; font-size:1.1rem; border-radius:4px; margin-top:8px;">Confirm Order</button>
            </form>
        </div>
    </div>

    </div>

<script src="../scripts/scripts.js"></script>

</body>
</html>