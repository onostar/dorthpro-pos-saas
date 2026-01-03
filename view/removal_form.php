<div id="remove_item">
<?php
    session_start();
    $store = $_SESSION['store_id'];
    if (isset($_GET['item'])){
        $id = $_GET['item'];
    

    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_item = new selects();
    $rows = $get_item->fetch_details_2cond('inventory', 'item', 'store', $id, $store);
     if(gettype($rows) == 'array'){
        foreach($rows as $row):
            
        //get item name
        $get_name = new selects();
        $name = $get_name->fetch_details_group('items', 'item_name', 'item_id', $row->item);
    ?>
    <div class="add_user_form priceForm" style="width:70%; margin:20px;">
        <h3 style="background:var(--primaryColor); text-align:left">Remove quantity from <?php echo strtoupper($name->item_name)?><span style="color:red; font-weight:bold"> (<?php echo $row->quantity?>)</span></h3>
        <section class="addUserForm" style="text-align:left;">
            <div class="inputs">
                <!-- <div class="data item_head"> -->
                    <input type="hidden" name="item_id" id="item_id" value="<?php echo $row->item?>" required>
                <div class="data" style="width:25%">
                    <label for="sales_price">Remove Qty</label>
                    <input type="text" name="quantity" id="quantity" value="<?php echo $row->quantity?>">
                </div>
                <div class="data" style="width:25%">
                    <label for="sales_price">Reason for removal</label>
                    <select name="remove_reason" id="remove_reason" onclick="checkReason(this.value)">
                        <option value=""selected>Select reason for removal</option>
                        <?php
                            $get_reason = new selects();
                            $rows = $get_reason->fetch_details('remove_reasons');
                            foreach($rows as $row){
                        ?>
                            <option value="<?php echo $row->reason?>"><?php echo $row->reason?></option>
                        <?php }?>
                    </select>
                </div>
                <div class="data" style="width:25%" id="otherReason">
                    <label for="other_reason">Enter reason for removal</label>
                    <input type="text" name="other_reason" id="other_reason" value="">
                </div>
                <div class="data" style="width:30%; display:flex;">
                    <button type="submit" id="adjust_qty" name="adjust_qty" onclick="removeQty()"> Remove <i class="fas fa-save"></i></button>
                    <a href="javascript:void(0)" title="close form" style='background:red; padding:10px; border-radius:5px; color:#fff' onclick="showPage('remove_item.php')">Return <i class='fas fa-angle-double-left'></i></a>
                </div>
            </div>
        </section>   
    </div>
    
<?php
    endforeach;
     }
    }    
?>
</div>