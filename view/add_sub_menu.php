<?php
    include "../classes/dbh.php";
    include "../classes/select.php";
?>
<style>
    @media screen and (max-width: 800px){
        .inputs input, .inputs select{
            margin:5px 0!important;
        }
        .inputs label{
            padding:0!important;
            margin:0!important;
        }
    }
</style>
<div id="add_sub_menu" class="displays" style="width:50%!important; margin:20px 20px!important;">
    <div class="info"></div>
    <div class="add_user_form">
        <h3>Create sub-menus</h3>
        <!-- <form method="POST" id="addUserForm"> -->
        <form>
            <div class="inputs">
                <div class="data">
                    <label for="department">Select menu</label>
                    <select name="menus" id="menus">
                        <option value=""selected required>Choose Menu</option>
                        <?php
                            $get_dep = new selects();
                            $rows = $get_dep->fetch_details_order('menus', 'menu');
                            foreach($rows as $row){
                        ?>
                        <option value="<?php echo $row->menu_id?>"><?php echo $row->menu?></option>
                        <?php } ?>
                    </select>
                </div>
                <div class="data">
                    <label for="department">Select package</label>
                    <select name="package" id="package">
                        <option value=""selected required>Choose Package</option>
                        <?php
                            $get_dep = new selects();
                            $rows = $get_dep->fetch_details_order('packages', 'package');
                            foreach($rows as $row){
                        ?>
                        <option value="<?php echo $row->package_id?>"><?php echo $row->package?></option>
                        <?php } ?>
                    </select>
                </div>
                <div class="data">
                    <label for="sub_menu">Sub-Menu</label>
                    <input type="text" name="sub_menu" id="sub_menu" placeholder="Enter sub-menu" required>
                </div>

                <div class="data">
                    <label for="url">Sub-menu Link</label>
                    <input type="text" name="sub_menu_url" id="sub_menu_url" placeholder="Enter sub-menu url" required>
                </div>
                <button type="button" id="add_cat" name="add_cat" onclick="addSubMenu()">Save record <i class="fas fa-layer-group"></i></button>
            </div>
        </form>    
    </div>
</div>
