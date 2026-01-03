<?php
    session_start();
    $store = $_SESSION['store_id'];
    $item = htmlspecialchars(stripslashes($_POST['item']));
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_item = new selects();
    $rows = $get_item->fetch_details_like2EqualCond('items', 'item_name', 'barcode', $item);
     if(gettype($rows) == 'array'){
        foreach($rows as $row):
            //get item quantity from inventory
            $get_qty = new selects();
            $qtys = $get_qty->fetch_details_2cond('inventory', 'store', 'item', $store, $row->item_id);
            if(gettype($qtys) == 'array'){
                $sums = $get_qty->fetch_sum_double('inventory', 'quantity', 'store', $store, 'item', $row->item_id);
                foreach($sums as $sum){
                    $quantity = $sum->total;
                }
            }
            if(gettype($qtys) == 'string'){
                $quantity = 0;
            }
        if($quantity > 0){
    ?>
    <div class="results">
        <a href="javascript:void(0)"  onclick="showPage('view_remove_batch.php?item=<?php echo $row->item_id?>')" title="view batches"><?php echo $row->item_name." (Quantity => ".$quantity.")"?></a>
    </div>
    <?php 
        }else{      
    ?>
        <div class="results">
            <a href="javascript:void(0)"  onclick="alert('Item has 0 Quantity')"><?php echo $row->item_name." (Price => ₦".$row->sales_price.", Quantity => ".$quantity.")"?></a>
        </div>
    <?php
        }
    endforeach;
     }else{
        echo "No resullt found";
     }
?>