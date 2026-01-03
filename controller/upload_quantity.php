<?php

?> 

<?php
session_start();
    //instantiate classes
    include "../classes/dbh.php";
    include "../classes/inserts.php";
    // if(isset($_POST['upload_paid'])){
    
        // Allowed mime types
        $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
        
        // Validate whether selected file is a CSV file
        if(!empty($_FILES['items']['name']) && in_array($_FILES['items']['type'], $csvMimes)){
            
            // If the file is uploaded
            if(is_uploaded_file($_FILES['items']['tmp_name'])){
                
                // Open uploaded CSV file with read-only mode
                $csvFile = fopen($_FILES['items']['tmp_name'], 'r');
                
                // Skip the first line
                fgetcsv($csvFile);
                
                // Parse data from CSV file line by line
                while(($line = fgetcsv($csvFile)) !== FALSE){
                    // Get row data
                    $item   = $line[0];
                    $store = $line[1];
                    $cost_price  = $line[2];
                    $quantity  = $line[3];
                    $batch_number  = $line[4];
                    $expiration_date  = $line[5];
                    $reorder_level  = $line[6];
                    
                    $data = array(
                        'item' => $item,
                        'store' => $store,
                        'cost_price' => $cost_price,
                        'quantity' => $quantity,
                        'batch_number' => $batch_number,
                        'expiration_date' => $expiration_date,
                        'reorder_level' => $reorder_level
                    );
                    $upload = new add_data('inventory', $data);
                    $upload->create_data();
                    // Check whether member already exists in the database with the same pcn number
                    
                       /*  // Insert member data in the database
                        $connectdb->query("INSERT INTO paid_members (pcn_number, first_name, last_name, whatsapp, res_state, user_email, gender, fellow) VALUES ('".$pcn_number."', '".$first_name."', '".$last_name."', '".$whatsapp."', '".$res_state."', '".$user_email."', '".$gender."', '".$fellow."')"); */
                       
                    
                }
                
                // Close opened CSV file
                fclose($csvFile);
                
                $_SESSION['success'] = "Quantity uploaded successfully!";
                header("Location: ../view/users.php");
            }else{
                $_SESSION['error'] = "Failed";
                header("Location: ../view/users.php");
            }
        }else{
            $_SESSION['error'] = "Invalid file";
                header("Location: ../view/users.php");
        }
    // }
    