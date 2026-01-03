<?php

    if (isset($_GET['item_id'])){
        $id = $_GET['item_id'];
    

    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_item = new selects();
    $rows = $get_item->fetch_details_cond('users', 'user_id', $id);
     if(gettype($rows) == 'array'){
        foreach($rows as $row):
            
        
    ?>
    <div class="add_user_form priceForm" style="width:70%; margin:5px 0;">
        <h3 style="background:var(--primaryColor); text-align:left">Change user role for <?php echo strtoupper($row->full_name)?></h3>
        <section class="addUserForm" style="text-align:left;">
            <div class="inputs">
                <!-- <div class="data item_head"> -->
                    <input type="hidden" name="user_id" id="user_id" value="<?php echo $row->user_id?>" required>
                <div class="data" style="width:auto">
                    <label for="rol">User Role</label>
                    <select name="user_role" id="user_role">
                        <option value="<?php echo $row->user_role?>"><?php echo $row->user_role?></option>
                        <option value="Admin">Admin</option>
                        <option value="Sales Rep">Sales Rep</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Inventory Officer">Inventory Officer</option>
                    </select>
                </div>
                <div class="data adjust_btn" style="width:auto; display:flex;">
                    <button type="submit" id="adjust_rol" name="adjust_rol" onclick="updateRole()"> Update</button>
                    <a href="javascript:void(0)" title="close form" style='background:red; padding:10px; border-radius:5px; color:#fff' onclick="closeForm()">Return </a>
                </div>
            </div>
        </section>   
    </div>
    
<?php
    endforeach;
     }
    }    
?>