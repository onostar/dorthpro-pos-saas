
<?php
session_start();
$store = $_SESSION['store_id'] ?? null;
$item = htmlspecialchars(trim($_POST['item']));
$type = $_POST['type'] ?? null;

if (!$store || !$item || !$type) {
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

include "../classes/dbh.php";
include "../classes/select.php";

$get_item = new selects();

$rows = $get_item->fetch_items_sales($store, $item, $type);
if (is_array($rows)) {
    $results = [];
    foreach ($rows as $row) {

        $results[] = [
            'item_id' => $row->item_id,
            'item_name' => $row->item_name,
            'sales_price' => $row->sales_price,
            'quantity' => $row->quantity,
        ];
    }
    echo json_encode($results);
} else {
    echo json_encode(['error' => 'No results found']);
}