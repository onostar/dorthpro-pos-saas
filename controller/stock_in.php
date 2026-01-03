<?php
    date_default_timezone_set("Africa/Lagos");
    $trans_type = "purchase";
    $posted = htmlspecialchars(stripslashes($_POST['posted_by']));
    $store = htmlspecialchars(stripslashes($_POST['store']));
    $item = htmlspecialchars(stripslashes($_POST['item_id']));
    $supplier = htmlspecialchars(stripslashes($_POST['supplier']));
    $invoice = htmlspecialchars(stripslashes($_POST['invoice_number']));
    $quantity = htmlspecialchars(stripslashes($_POST['quantity']));
    $cost_price = htmlspecialchars(stripslashes($_POST['cost_price']));
    $sales_price = htmlspecialchars(stripslashes($_POST['sales_price']));
   $pack_price = htmlspecialchars(stripslashes($_POST['pack_price']));
   /*$wholesale = htmlspecialchars(stripslashes($_POST['wholesale_price']));
    $wholesale_pack = htmlspecialchars(stripslashes($_POST['wholesale_pack']));*/
    $pack_size = htmlspecialchars(stripslashes($_POST['pack_size']));
    $expiration = htmlspecialchars(stripslashes($_POST['expiration_date']));
    // $guest_id = str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $date = date("Y-m-d H:i:s");
    //instantiate classes
    include "../classes/dbh.php";
    include "../classes/inserts.php";
    include "../classes/update.php";
    include "../classes/select.php";
    //get reordr level
    $get_reorder = new selects();
    $row = $get_reorder->fetch_details_group('items', 'reorder_level', 'item_id', $item);
    $reorder_level = $row->reorder_level;
    // get item previous quantity in inventory;
    $get_prev_qty = new selects();
    $prev_qtys = $get_prev_qty->fetch_details_2cond('inventory', 'item', 'store', $item, $store);
    if(gettype($prev_qtys) === 'array'){
        $get_inv = new selects();
        $invs = $get_inv->fetch_sum_double('inventory', 'quantity', 'item', $item, 'store', $store);
        foreach($invs as $inv){
            $inv_qty = $inv->total;
        }
        //check the batches
        $check_batch = new selects();
        $btcs = $check_batch->fetch_details_3cond('inventory', 'item', 'store', 'expiration_date', $item, $store, $expiration);
       
    }
    if(gettype($prev_qtys) === 'string'){
        $inv_qty = 0;
    }

    //data to insert into audit trail
    $audit_data = array(
        'item' => $item,
        'transaction' => $trans_type,
        'previous_qty' => $inv_qty,
        'quantity' => $quantity,
        'posted_by' => $posted,
        'store' => $store,
        'post_date' => $date

    );
    
    $inser_trail = new add_data('audit_trail', $audit_data);
    $inser_trail->create_data();
    //check if item is in store inventory
    $check_item = new selects();
    if(gettype($prev_qtys) === 'array'){
        if(gettype($btcs) == 'array'){
            //update current quantity in inventory for similar batch
            foreach($btcs as $btc){
                $btc_qty = $btc->quantity;
            }
            $new_qty = $btc_qty + $quantity;
            $update_inventory = new Update_table();
            $update_inventory->update_double3Cond('inventory', 'quantity', $new_qty, 'cost_price', $cost_price, 'expiration_date', $expiration, 'item', $item, 'store', $store);
        }
        if(gettype($btcs) == 'string'){
            //insert into inventory ifbatch not found
            $inventory_data = array(
                'item' => $item,
                'cost_price' => $cost_price,
                'expiration_date' => $expiration,
                'quantity' => $quantity,
                'reorder_level' => $reorder_level,
                'store' => $store,
                'post_date' => $date
            );
            $insert_item = new add_data('inventory', $inventory_data);
            $insert_item->create_data();
        }
    }
    //add to inventory if not found
    if(gettype($prev_qtys) === 'string'){
        //data to insert into inventory
        $inventory_data = array(
            'item' => $item,
            'cost_price' => $cost_price,
            'expiration_date' => $expiration,
            'quantity' => $quantity,
            'reorder_level' => $reorder_level,
            'store' => $store,
            'post_date' => $date
        );
        $insert_item = new add_data('inventory', $inventory_data);
        $insert_item->create_data();
    }
    //stockin item
    //data to stockin into purchases
    $purchase_data = array(
        'item' => $item,
        'invoice' => $invoice,
        'cost_price' => $cost_price,
        'vendor' => $supplier,
        'sales_price' => $sales_price,
        'expiration_date' => $expiration,
        'quantity' => $quantity,
        'posted_by' => $posted,
        'store' => $store,
        'post_date' => $date
    );
    $stock_in = new add_data('purchases', $purchase_data);
    $stock_in->create_data();
    
    if($stock_in){
        
        //update all prices and pack size
        $update_item = new Update_table();
        $update_item->update_six('items', 'cost_price', $cost_price, 'sales_price', $sales_price, 'pack_price', $pack_price, 'wholesale', 0, 'wholesale_pack', 0, 'pack_size', $pack_size, 'item_id', $item);
        if($update_item){
        //update expiration
       /*  $update_exp = new Update_tawble();
        $update_exp->update('items', 'expiration_date', 'item_id', $expiration, $item); */

        include "../controller/stockin_details.php";
        
?>
    
<?php
        }
    } 

?>