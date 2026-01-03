<?php
    include "../classes/dbh.php";
    include "../classes/select.php";
?>

<div id="add_room" class="displays">
    <div class="info" style="width:80%; margin:0"></div>
    <div class="add_user_form" style="width:80%; margin:0">
        <h3 style="background:var(--moreColor)">Create items</h3>
        <!-- <form method="POST" id="addUserForm"> -->
        <section class="addUserForm">
            <div class="inputs">
                <div class="data" style="width:32%; margin:10px 0;">
                    <label for="department">Category</label>
                    <select name="department" id="department" onchange="getCategory(this.value)">
                        <option value=""selected required>Select item category</option>
                        <?php
                            $get_dep = new selects();
                            $rows = $get_dep->fetch_details('departments');
                            foreach($rows as $row){
                        ?>
                        <option value="<?php echo $row->department_id?>"><?php echo $row->department?></option>
                        <?php } ?>
                    </select>
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="item_category"> Sub-Category</label>
                    <select name="item_category" id="item_category">
                        <option value=""selected required>Select item sub-category</option>
                        
                    </select>
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="item">Item Name</label>
                    <input type="text" name="item" id="item" required placeholder="Input item name">
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="barcode">Barcode</label>
                    <input type="text" name="barcode" id="barcode" required placeholder="Input item barcode">
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="cost">Cost Price (NGN)</label>
                    <input type="text" name="cost" id="cost" required>
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="sales_price">Selling Price (NGN)</label>
                    <input type="text" name="sales_price" id="sales_price" required>
                </div>
                <!-- <div class="data" style="width:32%; margin:10px 0">
                    <label for="Invoice">Invoice Number</label>
                    <input type="text" name="invoice" id="invoice" required>
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="vendor">Supplier</label>
                    <select name="vendor" id="vendor">
                        <option value=""selected required>Select supplier</option>
                        <?php
                            $get_dep = new selects();
                            $rows = $get_dep->fetch_details('vendors');
                            foreach($rows as $row){
                        ?>
                        <option value="<?php echo $row->vendor_id?>"><?php echo $row->vendor?></option>
                        <?php } ?>
                    </select>
                </div> -->
                <input type="hidden" name="invoice" id="invoice" value="<?php echo 'INV-start-'.date('mY')?>">
                <input type="hidden" name="vendor" id="vendor" value="1">
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="sales_price">Re-order Level</label>
                    <input type="number" name="reorder" id="reorder" required value="10">
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="sales_price">Quantity</label>
                    <input type="number" name="quantity" id="quantity" required value="0">
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <label for="exp_date">Expiration date</label>
                    <input type="date" name="expiration_date" id="expiration_date" required>
                </div>
                <div class="data" style="width:32%; margin:10px 0">
                    <button type="button" id="add_item" name="add_item" onclick="addItem()">Save record <i class="fas fa-save"></i></button>
                </div>
            </div>
        </section>    
    </div>
</div>
