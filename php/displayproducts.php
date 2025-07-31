<?php
header('Content-Type: application/json');
require '../conn.php';

$sql = "SELECT id, productName, price, unitType, imageURL FROM tbl_products";
$result = $conn->query($sql);

$products = [];

if ($result && $result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'productID' => $row['id'],
            'imageURL' => $row['imageURL'],
            'productName' => $row['productName'],
            'price' => $row['price'],
            'unitType' => $row['unitType'],
        ];
    }
}

echo json_encode($products);
$conn->close();
