<?php
    date_default_timezone_set("Africa/Lagos");
    session_start();
    $department = htmlspecialchars(stripslashes($_POST['department']));
    $category = htmlspecialchars(stripslashes($_POST['item_category']));
    $item = strtoupper(htmlspecialchars(stripslashes($_POST['item'])));
    $barcode = htmlspecialchars(stripslashes($_POST['barcode']));
    $cost = htmlspecialchars(stripslashes($_POST['cost']));
    $sales = htmlspecialchars(stripslashes($_POST['sales_price']));
    $reorder_level = htmlspecialchars(stripslashes($_POST['reorder']));
    $quantity = htmlspecialchars(stripslashes($_POST['quantity']));
    $expiration = htmlspecialchars(stripslashes($_POST['expiration_date']));
    $invoice = htmlspecialchars(stripslashes($_POST['invoice']));
    $vendor = htmlspecialchars(stripslashes($_POST['vendor']));
    $date = date("Y-m-d H:i:s");
    $store = $_SESSION['store_id'];
    $posted = $_SESSION['user_id'];
    $data = array(
        'item_name' => $item,
        'department' => $department,
        'category' => $category,
        'barcode' => $barcode,
        'cost_price' => $cost,
        'sales_price' => $sales,
        'reorder_level' => $reorder_level
    );
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/inserts.php";

    //check if item already Exist
    $check = new selects();
    $results = $check->fetch_count_2cond('items', 'category', $category, 'item_name', $item);
    if($results > 0){
        echo "<p class='exist'><span>$item</span> already exists</p>";
    }else{
        //create item
        $add_data = new add_data('items', $data);
        $add_data->create_data();
        if($add_data){
            if($quantity != 0){
                //get id
                $id = $check->fetch_lastInserted('items', 'item_id');
                $item_id = $id->item_id;
                //stock in quantity
                $inventory_data = array(
                    'item' => $item_id,
                    'cost_price' => $cost,
                    'expiration_date' => $expiration,
                    'quantity' => $quantity,
                    'reorder_level' => $reorder_level,
                    'store' => $store,
                    'post_date' => $date
                );
                $insert_item = new add_data('inventory', $inventory_data);
                $insert_item->create_data();
                //purchase data
                //data to stockin into purchases
                $purchase_data = array(
                    'item' => $item_id,
                    'invoice' => $invoice,
                    'cost_price' => $cost,
                    'vendor' => $vendor,
                    'sales_price' => $sales,
                    'expiration_date' => $expiration,
                    'quantity' => $quantity,
                    'posted_by' => $posted,
                    'store' => $store,
                    'post_date' => $date
                );
                $stock_in = new add_data('purchases', $purchase_data);
                $stock_in->create_data();
                //data to insert into audit trail
                $audit_data = array(
                    'item' => $item_id,
                    'transaction' => 'Purchase',
                    'previous_qty' => 0,
                    'quantity' => $quantity,
                    'posted_by' => $posted,
                    'store' => $store,
                    'post_date' => $date

                );
                
                $inser_trail = new add_data('audit_trail', $audit_data);
                $inser_trail->create_data();

            }
            echo "<p><span>$item</span> created successfully!</p>";
        }
    }