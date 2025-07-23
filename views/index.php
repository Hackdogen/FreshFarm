<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fresh Farms Market</title>
    <link rel="stylesheet" href="../styles/styles.css">
</head>


<body>

    <header>
        <h1>Fresh Farms Market</h1>
    </header>

    <main>
        <h2>Buy fresh produce at affordable prices</h2>
    </main>

      <button class="add-products">Add Products</button>

    <div class="modal" id="modal">
        <div class="modal-content">
            <button class="close-modal">×</button>

            <br/>
              <br/>

            <form id="addproductform" method="post" enctype="multipart/form-data" >
                <input type="text" name="product-name" id="product-name" placeholder="Enter Product Name" required>
                <input type="number" name="price" id="price" placeholder="Enter Price" step="0.01" required>
                
                <select name="unit" id="unit">
                    <option value="kg">Kg</option>
                    <option value="pack">Pack</option>
                </select>

                <input type="file" name="image" id="image" accept="image/*" required>

                <img id="preview" style="max-width: 100px; display: none; margin-top: 10px; border: 1px solid green;">
                <br/>
                <br/>
                <button type="submit" id="add-product-btn">Add Product</button>
            </form>
        </div>
    </div>

    <div class="product-grid" id="product-list"></div>

<script src="../scripts/scripts.js"></script>

</body>
</html>