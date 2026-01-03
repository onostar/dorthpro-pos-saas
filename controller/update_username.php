<?php

    // if(isset($_POST['change_passwords'])){
        $username = Ucwords(htmlspecialchars(stripslashes($_POST['username'])));
        $password = htmlspecialchars(stripslashes($_POST['password']));
        $user_id = htmlspecialchars(stripslashes($_POST['user_id']));
        // $retype_password = htmlspecialchars(stripslashes($_POST['retype_password']));
        

        // instantiate classes
        include "../classes/dbh.php";
        include "../classes/select.php";
        include "../classes/update.php";
        
        //check if username is taken
        $check_name = new selects();
        $name = $check_name->fetch_count_cond('users', 'username', $username);
        if($name > 0){
            echo "<p>Username already taken</p>";
        }else{
            $update = new Update_table();
            $update->updateUsername($username, $password, $user_id);
            // header("Location: ../index.php");
        }