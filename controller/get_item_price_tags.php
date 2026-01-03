<?php
    session_start();
    $store = $_SESSION['store_id'];
    $item = htmlspecialchars(stripslashes($_POST['item']));
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_item = new selects();
    $rows = $get_item->fetch_details_like2EqualCond('items', 'item_name', 'barcode', $item);
    if(is_array($rows)){
        foreach($rows as $row):
            $sales_price = $row->sales_price;
            /* for markup pricing */
            $cost = $row->cost_price;
            $markup = $row->markup;
            $cost_markup = $cost * ($markup/100);
            // $sales_price = $cost + $cost_markup;
            $quantity = 0;
            //get item quantity from inventory
            $get_qty = new selects();
            $qtys = $get_qty->fetch_details_2cond('inventory', 'store', 'item', $store, $row->item_id);
            if(is_array($qtys)){
                $sums = $get_qty->fetch_sum_double('inventory', 'quantity', 'store', $store, 'item', $row->item_id);
                if (is_array($sums) && !empty($sums)) {
                    foreach ($sums as $sum) {
                        $quantity = $sum->total;
                    }
                }
            }
    ?>
    <div class="results">
        <a href="javascript:void(0)" onclick="printPriceTag('<?php echo $row->item_id?>')"><?php echo $row->item_name." (Price => ₦".$sales_price.")"?></a>
    </div>
    
    
<?php
    endforeach;
     }else{
        echo "No resullt found";
     }
?>