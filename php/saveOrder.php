<?php
require_once '../conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $customerName = $data['customerName'] ?? '';
    $customerContact = $data['customerContact'] ?? '';
    $orderDate = date('Y-m-d H:i:s');
    $cart = $data['cart'] ?? [];

    // validation for order
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
    if (!is_array($cart) || count($cart) === 0) {
        http_response_code(400);
        echo 'Cart is empty.';
        exit;
    }

    // Insert into tbl_orders
    $stmt = $conn->prepare('INSERT INTO tbl_orders (customerName, contactNumber, orderDate) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $customerName, $customerContact, $orderDate);
    if ($stmt->execute()) {
        $orderID = $conn->insert_id;
        $success = true;
        foreach ($cart as $item) {
            $productID = $item['productID'];
            $quantity = $item['quantity'];
            if (!is_numeric($quantity) || $quantity <= 0) continue;
            $stmt2 = $conn->prepare('INSERT INTO tbl_details (orderID, productID, quantityOrdered) VALUES (?, ?, ?)');
            $stmt2->bind_param('iii', $orderID, $productID, $quantity);
            if (!$stmt2->execute()) {
                $success = false;
            }
            $stmt2->close();
        }
        if ($success) {
            echo 'Order saved successfully!';
        } else {
            http_response_code(500);
            echo 'Failed to save some order details.';
        }
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

