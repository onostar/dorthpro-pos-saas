<?php
    date_default_timezone_set("Africa/Lagos");
    session_start();
    $posted = $_SESSION['user_id'];    
    $store = $_SESSION['store_id'];    
    $trans_type ="transfer between items";
    $item_from = htmlspecialchars(stripslashes($_POST['transfer_qty_from']));
    $item_to = htmlspecialchars(stripslashes($_POST['transfer_qty_to']));
    $remove_qty = htmlspecialchars(stripslashes($_POST['remove_qty']));
    $add_qty = htmlspecialchars(stripslashes($_POST['add_qty']));
    $date = date("Y-m-d H:i:s");
    //instantiate classes
    include "../classes/dbh.php";
    include "../classes/inserts.php";
    include "../classes/update.php";
    include "../classes/select.php";
    //get item details 
    //get items to transfer from
    $get_item_det = new selects();
    $itemss = $get_item_det->fetch_details_cond('items', 'item_id', $item_from);
    foreach($itemss as $items){
        $from_name = $items->item_name;
    }
    // get item to transfer from previous quantity in inventory;
    $prev_qtys = $get_item_det->fetch_details_2cond('inventory', 'item', 'store', $item_from, $store);
    if(gettype($prev_qtys) === 'array'){
        foreach($prev_qtys as $prev_qty){
            // $inv_qty = $prev_qty->quantity;
            $expiration = $prev_qty->expiration_date;
        }
    }
    //get total previous quantity from all batches in item totransfer from
    $sums = $get_item_det->fetch_sum_double('inventory', 'quantity', 'store', $store, 'item', $item_from);
    foreach($sums as $sum){
        $from_inv_qty = $sum->total;
    }
    //get items to transfer to
    $itemsss = $get_item_det->fetch_details_cond('items', 'item_id', $item_to);
    foreach($itemsss as $itemss){
        $to_name = $itemss->item_name;
        $to_cost = $itemss->cost_price;
        $reorder = $itemss->reorder_level;
    }
    // get item to transfer to previous quantity in inventory;
    $toprev_qtys = $get_item_det->fetch_details_2cond('inventory', 'item', 'store', $item_to, $store);
    if(gettype($toprev_qtys) === 'array'){
        foreach($toprev_qtys as $toprev_qty){
            // $inv_qty = $prev_qty->quantity;
            $to_expiration = $toprev_qty->expiration_date;
        }
    }
    //get total previous quantity from all batches in item to transfer to
    $tosums = $get_item_det->fetch_sum_double('inventory', 'quantity', 'store', $store, 'item', $item_to);
    foreach($tosums as $tosum){
        $to_inv_qty = $tosum->total;
    }
    //check item quantity
    if($remove_qty > $from_inv_qty){
        echo "<script>alert('$from_name do not have enough quantity! Cannot proceed');</script>";
        echo "<div class='notify' style='padding:4px!important'><p style='color:#fff!important'><span>$from_name</span> do not have enough quantity! Cannot proceed</p>";
    }else{
        $update_inventory = new Update_table(); 
    //update stock balance of item transferred to
    $insert_new = array(
        "item" => $item_to,
        "store" => $store,
        "cost_price" => $to_cost,
        "quantity" => $add_qty,
        "reorder_level" => $reorder,
        "expiration_date" => $expiration,
        "post_date" => $date
    );
    //first check if it exisits in inventory
    $check = $get_item_det->fetch_count_2cond('inventory', 'item', $item_to, 'store', $store);
    if($check > 0){
        //check if the batch exixts
        $check_batchs = $get_item_det->fetch_details_3cond('inventory', 'item', 'expiration_date', 'store', $item_to, $expiration, $store);
        if(is_array($check_batchs)){
            foreach($check_batchs as $batch){
                $batch_id = $batch->inventory_id;
            }
            //get batch quantity
            $btc_qty = $get_item_det->fetch_details_group('inventory', 'quantity', 'inventory_id', $batch->id);
            $to_batch_qty = $btc_qty->quantity;
            $new_qty_to = $to_batch_qty + $add_qty;
            //update quatity;
            $update_inventory->update('inventory', 'quantity', 'inventory_id', $new_qty_to, $batch_id);
        }else{
            // $insert to inventory if the batch is not found
            $add_inv = new add_data('inventory', $insert_new);
            $add_inv->create_data();
            
        }
    }else{
        // $insert to inventory if item is not found atall in store
            $add_inv = new add_data('inventory', $insert_new);
            $add_inv->create_data();
    }
    //audit trail for items transferred to
    $audit_data_to = array(
        'item' => $item_to,
        'transaction' => 'quantity from item',
        'previous_qty' => $to_inv_qty,
        'quantity' => $add_qty,
        'posted_by' => $posted,
        'store' => $store,
        "post_date" => $date
    );
    $inser_trail_to = new add_data('audit_trail', $audit_data_to);
    $inser_trail_to->create_data();
    //lets update quantity of item transferred from
    $update_qty = new Update_table();
    $update_qty->update_inv_qty2($remove_qty, $item_from, $store);

    //insert item from into audit trail
    $audit_data_from = array(
        'item' => $item_from,
        'transaction' => 'quantity to item',
        'previous_qty' => $from_inv_qty,
        'quantity' => $remove_qty,
        'posted_by' => $posted,
        'store' => $store,
        "post_date" => $date
    );
    
    $inser_from_trail = new add_data('audit_trail', $audit_data_from);
    $inser_from_trail->create_data();
    
    //inseet into items transfer table
    $data = array(
        'item_from' => $item_from,
        'item_to' => $item_to,
        'removed_qty' => $remove_qty,
        'added_qty' => $add_qty,
        'posted_by' => $posted,
        'store' => $store,
        "post_date" => $date
    );
    $complete_transfer = new add_data('item_transfers', $data);
    $complete_transfer->create_data();
    if($complete_transfer){
        
?>
    
    <div class="notify"><p><i class="fas fa-thumbs-up"></i> Items quantity transferred successfully!</p></div>
</div>
<?php
        }
    
    }
?>