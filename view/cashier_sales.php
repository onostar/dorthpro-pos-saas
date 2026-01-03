<?php
    session_start();
    $store = $_SESSION['store_id'];
    include "../classes/dbh.php";
    include "../classes/select.php";
    if(isset($_GET['cashier'])){
        $cashier = $_GET['cashier'];
        //get cahsier
        $get_cashier = new selects();
        $users = $get_cashier->fetch_details_cond('users', 'user_id', $cashier);
        foreach($users as $user){
            $cashier_name = $user->full_name;
        }
?>
<div id="revenueReport" class="displays management" style="margin:0!Important">
<div class="displays allResults new_data" id="revenue_report">
    <h2>Sales made by <?php echo $cashier_name?></h2>
    <hr>
    <div class="search">
        <input type="search" id="searchCheckout" placeholder="Enter keyword" onkeyup="searchData(this.value)">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'Sales report for <?php echo $cashier_name?>')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
        <a href="javascript:void(0)" style="background:brown;padding:5px;border-radius:10px;color:#fff;box-shadow:1px 1px 1px #222" title="return to cashier report" onclick="showPage('cashier_report.php')"><i class="fas fa-close"></i> Close</a>
    </div>
    <table id="data_table" class="searchTable">
        <thead>
            <tr style="background:var(--primaryColor)">
                <td>S/N</td>
                <td>Invoice</td>
                <td>Item</td>
		        <td>Qty</td>
                <td>Unit Price</td>
                <td>Total Amount</td>
                <!-- <td>Discount</td> -->
                <td>Payment Mode</td>
                <td>Post Time</td>
                <!-- <td>Posted by</td> -->
                
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_users = new selects();
                $details = $get_users->fetch_details_date2Cond('sales', 'date(post_date)', 'sales_status', 2, 'posted_by', $cashier);
                if(gettype($details) === 'array'){
                foreach($details as $detail):
            ?>
            <tr>
                <td style="text-align:center; color:red;"><?php echo $n?></td>
                <td><a style="color:green" href="javascript:void(0)" title="View invoice details" onclick="showPage('invoice_details.php?payment_id=<?php echo $detail->payment_id?>')"><?php echo $detail->invoice?></a></td>
                <td>
		    <?php
                        //get item name
                        $get_item = new selects();
                        $names = $get_item->fetch_details_group('items', 'item_name', 'item_id', $detail->item);
                        echo $names->item_name;
                    ?>
		</td>
		<td style="color:green; text-align:center"><?php echo $detail->quantity?></td>
                <td style="color:var(--otherColor)">
                    <?php echo "₦".number_format($detail->price, 2);?>
                </td>
                <td style="color:var(--secondaryColor)">
                    <?php 
                        echo "₦".number_format($detail->total_amount, 2)
                    ?>
                </td>
                <!-- <td style="color:red">
                    <?php echo "₦".number_format($detail->discount, 2);?>
                </td> -->
                <td>
                    <?php
                            //get payment mode
                            $get_mode = new selects();
                            $mode = $get_mode->fetch_details_group('payments', 'payment_mode', 'invoice', $detail->invoice);
                            //check if invoice is more than 1
                            $get_mode_count = new selects();
                            $rows = $get_mode_count->fetch_count_cond('payments', 'invoice', $detail->invoice);
                                if($rows >= 2){
                                    echo "Multiple payment";
                                }else{
                                    echo $mode->payment_mode;

                                }
                            ?>
                </td>
                <td style="color:var(--moreColor)"><?php echo date("H:i:sa", strtotime($detail->post_date));?></td>
                <!-- <td>
                    <?php
                        //get posted by
                        $get_posted_by = new selects();
                        $checkedin_by = $get_posted_by->fetch_details_group('users', 'full_name', 'user_id', $detail->posted_by);
                        echo $checkedin_by->full_name;
                    ?>
                </td> -->
                
            </tr>
            <?php $n++; endforeach;}?>
        </tbody>
    </table>
    
    <?php
        if(gettype($details) == "string"){
            echo "<p class='no_result'>'$details'</p>";
        }
    ?>
        <!-- <div class="all_amounts"> -->
            <div class="all_modes">
    <?php
        //get cash
        $get_cash = new selects();
        $cashs = $get_cash->fetch_sum_curdate2Con('payments', 'amount_paid', 'post_date', 'payment_mode', 'Cash', 'posted_by', $cashier);
        if(gettype($cashs) === "array"){
            foreach($cashs as $cash){
                ?>
                <a href="javascript:void(0)" class="sum_amount" style="background:var(--otherColor)" onclick="showPage('cash_list.php')"><strong>Cash</strong>: ₦<?php echo number_format($cash->total, 2)?></a>

                <?php
            }
        }
        //get pos
        $get_pos = new selects();
        $poss = $get_pos->fetch_sum_curdate2Con('payments', 'amount_paid', 'post_date', 'payment_mode', 'POS', 'posted_by', $cashier);
        if(gettype($poss) === "array"){
            foreach($poss as $pos){
                ?>
                <a href="javascript:void(0)" class="sum_amount" style="background:var(--secondaryColor)" onclick="showPage('pos_list.php')"><strong>POS</strong>: ₦<?php echo number_format($pos->total, 2)?></a>
                <?php
            }
        }
        //get transfer
        $get_transfer = new selects();
        $trfs = $get_transfer->fetch_sum_curdate2Con('payments', 'amount_paid', 'post_date', 'payment_mode', 'Transfer', 'posted_by', $cashier);
        if(gettype($trfs) === "array"){
            foreach($trfs as $trf){
                ?>
                <a href="javascript:void(0)" class="sum_amount" style="background:var(--primaryColor)" onclick="showPage('transfer_list.php')"><strong>Transfer</strong>: ₦<?php echo number_format($trf->total, 2)?></a>
                <?php
            }
        }
        ?>
            <!-- </div> -->
            <!-- <div class="all_total"> -->
        <?php
        // get sum
        $get_total = new selects();
        $amounts = $get_total->fetch_sum_curdateCon('payments', 'amount_paid', 'post_date', 'posted_by', $cashier);
        foreach($amounts as $amount){
            $paid_amount = $amount->total;
            
        }
        //if credit was sold
       /*  $get_credit = new selects();
        $credits = $get_credit->fetch_sum_curdate2Con('payments', 'amount_due', 'post_date', 'payment_mode', 'Credit', 'store', $store);
        if(gettype($credits) === "array"){
            foreach($credits as $credit){
                $owed_amount = $credit->total;
            }
            $total_revenue = $owed_amount + $paid_amount;
            echo "<p class='sum_amount' style='background:green; margin-left:250px; font-size:1rem;'><strong>Total</strong>: ₦".number_format($total_revenue, 2)."</p>";
        } */
        //if no credit sales
        // if(gettype($credits) == "string"){
            echo "<p class='sum_amount' style='background:green; margin-left:100px;'><strong>Total</strong>: ₦".number_format($paid_amount, 2)."</p>";
            
        // }
    ?>
            <!-- </div> -->
        </div>
</div>

<?php }?>
<script src="../jquery.js"></script>
<script src="../script.js"></script>