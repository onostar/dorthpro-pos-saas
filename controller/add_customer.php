<?php
    date_default_timezone_set("Africa/Lagos");
    $date = date("Y-m-d H:i:s");
    $customer = strtoupper(htmlspecialchars(stripslashes($_POST['customer'])));
    $phone = htmlspecialchars(stripslashes($_POST['phone_number']));
    $address = ucwords(htmlspecialchars(stripslashes(($_POST['address']))));
    $email = htmlspecialchars(stripslashes(($_POST['email'])));
    $socials = htmlspecialchars(stripslashes(($_POST['social_media'])));
    // $store = htmlspecialchars(stripslashes(($_POST['customer_store'])));
    $data = array(
        'customer' => $customer,
        'phone_numbers' => $phone,
        'customer_email' => $email,
        'customer_address' => $address,
        'social_media' => $social,
        'reg_date' => $date
        // 'store' => $store
    );
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/inserts.php";

   //check if customer exists
   $check = new selects();
   $results = $check->fetch_count_cond('customers', 'customer', $customer);
   $results2 = $check->fetch_details_cond('customers', 'phone_numbers', $phone);
   if($results > 0 || $results2 > 0){
       echo "<p class='exist'><span>$customer</span> already exists!</p>";
   }else{
       //create customer
       $add_data = new add_data('customers', $data);
       $add_data->create_data();
       if($add_data){
           echo "<p><span>$customer</span> ceated successfully!</p>";
       }
   }