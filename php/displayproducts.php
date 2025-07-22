<?php

header('Content-Type: application/json');
require '../conn.php';

$sql = "SELECT productName, price, unitType, imageURL FROM tbl_products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'imageURL' => '../assets/images/' . $row['imageURL'],
            'productName' => $row['productName'],
            'price' => $row['price'],
            'unitType' => $row['unitType'],
        ];
    }
} else {
    $products = [];
}

echo json_encode($products);
$conn->close();
