<?php
    date_default_timezone_set("Africa/Lagos");
    session_start();
    $store = $_SESSION['store_id'];
    $trans_type = "purchase delete";
    $posted = $_SESSION['user_id'];
    $date = date("Y-m-d H:i:s");
    // if(isset($_GET['id'])){
    //     $id = $_GET['id'];
        $purchase = $_GET['purchase_id'];
        $item = $_GET['item_id'];
        // instantiate classes
        include "../classes/dbh.php";
        include "../classes/select.php";
        include "../classes/update.php";
        include "../classes/inserts.php";
        include "../classes/delete.php";

        //get item details
        $get_qty = new selects();
        $rows = $get_qty->fetch_details_cond('purchases', 'purchase_id', $purchase);
        foreach($rows as $row){
            $qty = $row->quantity;
            $invoice = $row->invoice;
            $supplier = $row->vendor;
            $expiration = $row->expiration_date;
        }
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
            'quantity' => $qty,
            'posted_by' => $posted,
            'store' => $store,
            'post_date' => $date
        );
        
        $inser_trail = new add_data('audit_trail', $audit_data);
        $inser_trail->create_data();
        // get exact item from inventory and update
        $get_inv = new selects();
        $invs = $get_inv->fetch_details_3cond('inventory', 'store', 'item', 'expiration_date', $store, $item, $expiration);
        foreach($invs as $inv){
            $inventory_id = $inv->inventory_id;
        }

        //update quantity on items table
        $update_qty = new Update_table();
        $update_qty->subtract_quantity($qty, $inventory_id, $store);
        if($update_qty){
            //delete purcahse
            $delete = new deletes();
            $delete->delete_item('purchases', 'purchase_id', $purchase);
            if($delete){
?>
<!-- display stockins for items with same invoice number -->

<?php
    include "../controller/stockin_details.php";
            }            
        }
    // }
?>