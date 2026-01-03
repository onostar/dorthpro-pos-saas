<?php
    date_default_timezone_set("Africa/Lagos");
    $package = strtoupper(htmlspecialchars(stripslashes($_POST['package'])));
    $monthly = htmlspecialchars(stripslashes($_POST['monthly']));
    $bi_annual = htmlspecialchars(stripslashes($_POST['six_months']));
    $yearly = htmlspecialchars(stripslashes($_POST['yearly']));
    $date = date("Y-m-d H:i:s");
    $data = array(
        'package' => $package,
        'monthly' => $monthly,
        'six_months' => $bi_annual,
        'yearly' => $yearly,
        'post_date' => $date
    );
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/inserts.php";

    //check if item already Exist
    $check = new selects();
    $results = $check->fetch_count_cond('packages', 'package', $package);
    if($results > 0){
        echo "<p class='exist'><span>$package</span> already exists</p>";
    }else{
        //create item
        $add_data = new add_data('packages', $data);
        $add_data->create_data();
        if($add_data){
            echo "<p><span>$package</span> created successfully!</p>";
        }
    }