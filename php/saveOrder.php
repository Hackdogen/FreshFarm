<?php
require_once '../conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $customerName = $_POST['customerName'] ?? '';
    $customerContact = $_POST['customerContact'] ?? '';
    $orderDate = date('Y-m-d H:i:s');
    $productID = $_POST['productID'] ?? '';
    $quantity = $_POST['quantity'] ?? '';

    // Input validation (server-side)
    if (!preg_match('/^[A-Za-z ]+$/', $customerName)) {
        http_response_code(400);
        echo 'Invalid customer name.';
        exit;
    }
    if (!preg_match('/^\d{10,11}$/', $customerContact)) {
        http_response_code(400);
        echo 'Invalid contact number.';
        exit;
    }
    if (!is_numeric($quantity) || $quantity <= 0) {
        http_response_code(400);
        echo 'Invalid quantity.';
        exit;
    }

    // Insert into tbl_orders
    $stmt = $conn->prepare('INSERT INTO tbl_orders (customerName, contactNumber, orderDate) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $customerName, $customerContact, $orderDate);
    if ($stmt->execute()) {
        $orderID = $conn->insert_id;
        // Insert into tbl_details
        $stmt2 = $conn->prepare('INSERT INTO tbl_details (orderID, productID, quantityOrdered) VALUES (?, ?, ?)');
        $stmt2->bind_param('iis', $orderID, $productID, $quantity);
        if ($stmt2->execute()) {
            echo 'Order saved successfully!';
        } else {
            http_response_code(500);
            echo 'Failed to save order details.';
        }
        $stmt2->close();
    } else {
        http_response_code(500);
        echo 'Failed to save order.';
    }
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo 'Method not allowed.';
}

