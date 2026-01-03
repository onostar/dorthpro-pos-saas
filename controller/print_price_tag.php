
<?php
    include "receipt_style.php";
// session_start();
// instantiate class
include "../classes/dbh.php";
include "../classes/select.php";
    session_start();
    if(isset($_GET['item'])){
       $item = $_GET['item'];
        //get item details
        $get_item = new selects();
        $rows = $get_item->fetch_details_cond('items', 'item_id', $item);
        foreach($rows as $row){
            $item_name = $row->item_name;
            $price = $row->sales_price;
            $cost = $row->cost_price;
            $markup = $row->markup;
        }
        /* for markup pricing */
        /* $cost_markup = $cost * ($markup/100);
        $price = $cost + $cost_markup; */
?>
<div class="sales_receipt">
    <h2><?php echo $_SESSION['company'];?></h2>
    <p style="text-align:center;font-size:1.5rem"><strong><?php echo $item_name?></strong></p>
    <p style="text-align:center;font-size:2.5rem"><strong><?php echo "₦".number_format($price)?></strong></p>

    
</div> 
   
<?php
    echo "<script>window.print();
    window.close();</script>
    ";
                    // }
                }
            // }
        
    // }
?>