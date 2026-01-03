
<?php
    include "receipt_style.php";
// session_start();
// instantiate class
include "../classes/dbh.php";
include "../classes/select.php";
    session_start();
    if(isset($_GET['receipt'])){
        $user = $_SESSION['user_id'];
        $invoice = $_GET['receipt'];
        //get store
        $get_store = new selects();
        $strs = $get_store->fetch_details_group('sales', 'store', 'invoice', $invoice);
        //get store name
        $get_store_name = new selects();
        $rows = $get_store_name->fetch_details_cond('stores', 'store_id', $strs->store);
        foreach($rows as $row){
            $store_name = $row->store;
            $address = $row->store_address;
            $phone = $row->phone_number;

        }
        //get post date and time
        $get_date = new selects();
        $dts = $get_date->fetch_details_cond('sales', 'invoice', $invoice);
        foreach($dts as $dt){
            $posted_date = $dt->post_date;
        }
?>
<div class="displays allResults sales_receipt">
<h2><?php echo $_SESSION['company'];?></h2>
    <p><?php echo $address?></p>
    <p>Tel: <?php echo $phone?></p>
    <!-- get sales type -->
        <p>Date: <?php echo date("d-m-Y", strtotime($posted_date))?>, <?php echo date("h:i:sa", strtotime($posted_date))?></p>

    <div class="receipt_head">
        <p><?php echo $invoice?></p>
    <p><strong>ORDER TICKET</strong></p>
    </div>
    <table id="postsales_table" style="border-collapse:collapse" border="1" class="searchTable" style="border-collapse:collapse;">
        <thead>
            <tr style="background:var(--moreColor)">
                <td style="text-align:center; font-size:.8rem;">Items</td>
                <td style="text-align:center;font-size:.8rem;">Amount</td>
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_items = new selects();
                $details = $get_items->fetch_count_cond('sales', 'invoice', $invoice);
            ?>
            <tr>
                <td style="text-align:center; font-size:.8rem;"><?php echo $details?></td>
                
                <td style="font-size:.8rem;">
                    <?php
                        $get_total = new selects(); 
                        $amounts = $get_total->fetch_sum_single('sales', 'total_amount', 'invoice', $invoice);
                        foreach($amounts as $amount){
                            echo "<p class='total_amount' style=' text-align:center;'>Total Due: ₦".number_format($amount->total, 2)."</p>";
                        }
                    ?>
                </td>
                
                
            </tr>
            
        </tbody>
    </table>
    <!-- <table id="postsales_table" class="searchTable">
        <thead>
            <tr style="background:var(--moreColor)">
            <td style="font-size:.8rem">S/N</td>
                <td style="font-size:.8rem">Item</td>
                <td style="font-size:.8rem">Qty</td>
                <td style="font-size:.8rem">Rate</td>
                <td style="font-size:.8rem">Amount</td>
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_items = new selects();
                $details = $get_items->fetch_details_cond('sales','invoice', $invoice);
                if(gettype($details) === 'array'){
                foreach($details as $detail):
            ?>
            <tr style="font-size:.8rem">
                <td style="text-align:center; color:red; font-size:.7rem"><?php echo $n?></td>
                <td style="color:var(--moreClor); font-size:.7rem">
                    <?php
                        //get category name
                        $get_item_name = new selects();
                        $item_name = $get_item_name->fetch_details_group('items', 'item_name', 'item_id', $detail->item);
                        echo $item_name->item_name;
                    ?>
                </td>
                <td style="text-align:center; color:red; font-size:.7rem"><?php echo $detail->quantity?>
                    
                </td>
                <td style="font-size:.7rem">
                    <?php 
                        echo number_format($detail->price);
                    ?>
                </td>
                <td style="font-size:.7rem">
                    <?php 
                        echo number_format($detail->total_amount);
                    ?>
                </td>
                
                
            </tr>
            
            <?php $n++; endforeach;}?>
        </tbody>
    </table> -->

    
    <?php
        if(gettype($details) == "string"){
            echo "<p class='no_result'>'$details'</p>";
        }
        // get sum;
        /* $get_total = new selects();
        $amounts = $get_total->fetch_sum_con('sales', 'price', 'quantity', 'invoice', $invoice);
        foreach($amounts as $amount){
            $total_amount = $amount->total;
        }

        // get amount paid from payments;
        $get_paid = new selects();
        $amt_paids = $get_paid->fetch_sum_single('payments', 'amount_paid', 'invoice', $invoice);
        foreach($amt_paids as $amt){
            $amount_paid = $amt->total;
        }
        
        //amount due
        echo "<p class='total_amount' style='color:#000'>Amount due: ₦".number_format($total_amount, 2)."</p>"; */
        
    
        //sold by
        $get_seller = new selects();
        $row = $get_seller->fetch_details_group('users', 'full_name', 'user_id', $user);
        echo ucwords("<p class='sold_by'>Ordered by: <strong>$row->full_name</strong></p>");
    ?>
    
</div> 
   
<?php
    echo "<script>window.print();
    window.close();</script>";
                    // }
                }
            // }
        
    // }
?>