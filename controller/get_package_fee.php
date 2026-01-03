<?php
    session_start();
    $package = htmlspecialchars(stripslashes($_POST['package']));
    $duration = htmlspecialchars(stripslashes($_POST['duration']));
    // echo $menu;
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_cat = new selects();
    $rows = $get_cat->fetch_details_cond('packages', 'package_id', $package);
?>
<?php
    if(gettype($rows) == 'array'){
        foreach ($rows as $row) {
            $monthly = $row->monthly;
            $six_months = $row->six_months;
            $yearly = $row->yearly;
        }
        if($duration == "Monthly"){
            $amount = $monthly;
        }elseif($duration == "Six months"){
            $amount = $six_months;
        }else{
            $amount = $yearly;
        }
        if($amount < 67000 ){
            $processing = 0.03 * $amount;
        }else{
            $processing = 2000;
        }

?>
<div class="data">
    <label for="">Processing Fee</label>
     <input type="text" value="<?php echo "₦".number_format($processing, 2)?>" readonly>
    <input type="hidden" name="processing" id="processing" value="<?php echo $processing?>" readonly>
</div>
<div class="data">
    <label for="fee">Total Due</label>
    <input type="text" id="to_pay" value="<?php echo "₦".number_format($amount + $processing, 2)?>" readonly>
    <input type="hidden" name="fee" id="fee" value="<?php echo $amount?>" readonly>
    <input type="hidden" name="total_due" id="total_due" value="<?php echo $amount + $processing?>" readonly>
</div>
<?php
        
    }else{
        echo "<input type='text' value='No result'>";
    }
?>