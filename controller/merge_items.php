<?php
    session_start();
    $correct_item = htmlspecialchars(stripslashes($_POST['correct_item']));
    $wrong_item = htmlspecialchars(stripslashes($_POST['wrong_item']));
    include "../classes/dbh.php";
    include "../classes/update.php";
    include "../classes/delete.php";
    //update across all tables

    //get all tables
    /* $get_tables = new selects();
    $tables = $get_tables->fetch_tables('tonnac_accounting');
    foreach($tables as $table){
        //check for customer number in each table and delete it when thenumber is seen
        $check_column = new selects();
        $cols = $check_column->fetch_column($table->table_name, 'trx_number');
        if($cols){
            $delete_tx = new deletes();
            $delete_tx->delete_item($table->table_name, 'trx_number', $trx_number);
        }
        
    } */
    //audit trail
    $change_item = new Update_table();
    $change_item->mergeItem('audit_trail', 'item',$correct_item, $wrong_item);
    //inventory
    $change_item->mergeItem('inventory', 'item',$correct_item, $wrong_item);
    //item quantity transfer from one to another
    $change_item->mergeItem('item_transfers', 'item_from', $correct_item, $wrong_item);
    $change_item->mergeItem('item_transfers', 'item_to', $correct_item, $wrong_item);
    //purchases
    $change_item->mergeItem('purchases', 'item',$correct_item, $wrong_item);
    //remove items
    $change_item->mergeItem('remove_items', 'item', $correct_item, $wrong_item);
    //sales
    $change_item->mergeItem('sales', 'item', $correct_item, $wrong_item);
    //sales return
    $change_item->mergeItem('sales_returns', 'item', $correct_item, $wrong_item);
    //stock adjustment
    $change_item->mergeItem('stock_adjustments', 'item', $correct_item, $wrong_item);
    //transfers to stores
    $change_item->mergeItem('transfers', 'item', $correct_item, $wrong_item);
    if($change_item){
        $delete_item = new deletes();
        $delete_item->delete_item('items', 'item_id', $wrong_item);
        echo "<div class='success'><p>Items merged successfully! <i class='fas fa-thumbs-up'></i></p></div>";
   }else{
       echo "<p style='background:red; color:#fff; padding:5px'>Failed to Merge Files <i class='fas fa-thumbs-down'></i></p>";
   }