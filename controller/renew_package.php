<?php
    date_default_timezone_set("Africa/Lagos");

    $fee = htmlspecialchars(stripslashes($_POST['fee']));
    $package = htmlspecialchars(stripslashes($_POST['package']));
    $processing = htmlspecialchars(stripslashes($_POST['processing']));
    $total_due = htmlspecialchars(stripslashes($_POST['total_due']));
    $email = htmlspecialchars(stripslashes($_POST['email_add']));
    $duration = htmlspecialchars(stripslashes($_POST['duration']));
    // $user = htmlspecialchars(stripslashes($_POST['user']));
    $company = htmlspecialchars(stripslashes($_POST['company']));
    $trx_number = htmlspecialchars(stripslashes($_POST['transNum']));
    $date = date("Y-m-d H:i:s");
    $current_date = date("Y-m-d");
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/inserts.php";
    include "../classes/update.php";
    include "../classes/delete.php";
    //get company create date
    $get_company = new selects();
    $rows = $get_company->fetch_details_cond('companies', 'company_id', $company);
    if(is_array($rows)){
        foreach($rows as $row){
            $due_date = $row->due_date;
        }
    }
    if($duration == "Monthly"){
        $new_due_date = date("Y-m-d", strtotime("+1 month", strtotime($due_date)));
    }elseif($duration == "Six months"){
        $new_due_date = date("Y-m-d", strtotime("+6 months", strtotime($due_date)));
    }else{
        $new_due_date = date("Y-m-d", strtotime("+1 year", strtotime($due_date)));
    }

    $data = array(
        'company' => $company,
        'package' => $package,
        'amount' => $fee,
        'duration' => $duration,
        'processing_fee' => $processing,
        'total_due' => $total_due,
        'previous_date' => $due_date,
        'new_due_date' => $new_due_date,
        'email_address' => $email,
        'trx_number' => $trx_number,
        // 'renewed_by' => $user,
        'renew_date' => $date
    );

    //update company package
    $update = new Update_table();
    $update->update('companies', 'due_date', 'company_id', $new_due_date, $company);
    if($update){
        //insert into renewal table
        $add_data = new add_data('renewals', $data);
        $add_data->create_data();
        //check user rights for the right package
        $delete_data = new deletes();
        if($package == 1){
            //remove all other rights that are not on the basic package
            $delete_data->delete_basic($package);
        }
        if($package == 2){
            //remove only the enterprise package rights if package is standard
            $delete_data->delete_enterprise(3);
        }
        
    }

    ?>
