<?php

    $menu = htmlspecialchars(stripslashes($_POST['menu']));
    $sub_menu = htmlspecialchars(stripslashes($_POST['sub_menu']));
    $user = htmlspecialchars(stripslashes($_POST['user']));
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/inserts.php";
    $get_details = new selects();
    //get sub menu name
    $menu_name = $get_details->fetch_details_cond('sub_menus','sub_menu_id', $sub_menu);
    foreach($menu_name as $men){
        $right = $men->sub_menu;
        $package = $men->package;
    }
    $data = array(
        'menu' => $menu,
        'sub_menu' => $sub_menu,
        'package' => $package,
        'user' => $user
    );
    

    //check if user already has right
    $check = new selects();
    $results = $check->fetch_count_2cond('rights', 'user', $user, 'sub_menu', $sub_menu);
    if($results > 0){
        echo "<p class='exist'>Right already exists for user</p>";
    }else{
        //create user
        $add_data = new add_data('rights', $data);
        $add_data->create_data();
        if($add_data){
            echo "<p>'$right' added to user!</p>";
        }
    }
    
?>
