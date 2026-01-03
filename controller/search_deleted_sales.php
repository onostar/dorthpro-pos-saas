<?php
    session_start();
    $store = $_SESSION['store_id'];
    $from = htmlspecialchars(stripslashes($_POST['from_date']));
    $to = htmlspecialchars(stripslashes($_POST['to_date']));

    // instantiate classes
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_revenue = new selects();
    $details = $get_revenue->fetch_details_2dateCon('deleted_sales', 'store', 'date(date_deleted)', $from, $to, $store);
    $n = 1;
?>
<h2>Deleted Sales between '<?php echo date("jS M, Y", strtotime($from)) . "' and '" . date("jS M, Y", strtotime($to))?>'</h2>
    <hr>
    <div class="search">
        <input type="search" id="searchRevenue" placeholder="Enter keyword" onkeyup="searchData(this.value)">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'SaDeleted Sales report')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
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
                <td>Date</td>
                <td>Posted by</td>
                
            </tr>
        </thead>
        <tbody>
<?php
    if(gettype($details) === 'array'){
    foreach($details as $detail){

?>
            <tr>
                 <td style="text-align:center; color:red;"><?php echo $n?></td>
                <td><a style="color:green" href="javascript:void(0)"><?php echo $detail->invoice?></a></td>
                <td>
		            <?php
                        //get item name
                        $names = $get_revenue->fetch_details_group('items', 'item_name', 'item_id', $detail->item);
                        echo $names->item_name;
                    ?>
		        </td>
		        <td style="color:green; text-align:center"><?php echo $detail->quantity?></td>
                <td style="color:var(--otherColor)">
                    <?php echo "₦".number_format($detail->price, 2);?>
                </td>
                <td style="color:var(--secondaryColor)">
                    <?php 
                        echo "₦".number_format($detail->quantity * $detail->price, 2)
                    ?>
                </td>
                
                <td style="color:var(--moreColor)"><?php echo date("H:i:sa", strtotime($detail->date_deleted));?></td>
                <td>
                    <?php
                        //get posted by
                        $checkedin_by = $get_revenue->fetch_details_group('users', 'full_name', 'user_id', $detail->deleted_by);
                        echo $checkedin_by->full_name;
                    ?>
                </td>
                
            </tr>
            <?php $n++; }}?>
        </tbody>
    </table>
<?php
    if(gettype($details) == "string"){
        echo "<p class='no_result'>'$details'</p>";
    }
?>
<div class="all_modes">
    <?php
   
    // get sum
   /*  $get_total = new selects();
    $amounts = $get_total->fetch_sum_2date2Cond('sales', 'total_amount', 'date(post_date)', 'sales_status', 'store', $from, $to, 2, $store);
    foreach($amounts as $amount){
        $paid_amount = $amount->total;
    } */
   
    // if(gettype($credits) == "string"){
        // echo "<p class='sum_amount' style='background:green; margin-left:100px;'><strong>Total</strong>: ₦".number_format($paid_amount, 2)."</p>";
        
    // }
    
?>
</div>