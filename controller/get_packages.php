<?php
    session_start();
    $package = htmlspecialchars(stripslashes($_POST['package']));
    // echo $menu;
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_cat = new selects();
    $rows = $get_cat->fetch_details_cond('packages', 'package_id', $package);
?>
<option value=""selected disabled>Select Package Duration</option>
<?php
    if(gettype($rows) == 'array'){
        foreach ($rows as $row) {
            $monthly = $row->monthly;
            $six_months = $row->six_months;
            $yearly = $row->yearly;
        }

?>
    <option value="Monthly">1 Month (₦<?php echo number_format($monthly, 2)?>)</option>
    <option value="Six months">6 Months (₦<?php echo number_format($six_months, 2)?>)</option>
    <option value="Yearly">1 Year (₦<?php echo number_format($yearly, 2)?>)</option>
<?php
        
    }else{
        echo "<option value=''selected>$menu</option>";
    }
?>