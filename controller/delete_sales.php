<?php
        session_start();
        date_default_timezone_set("Africa/Lagos");
        $user = $_SESSION['user_id'];
        $store = $_SESSION['store_id'];
        $date = date("Y-m-d H:i:s");
    // if(isset($_GET['id'])){
    //     $id = $_GET['id'];
        $sales = $_GET['sales_id'];
        $item = $_GET['item_id'];
        // instantiate classes
        include "../classes/dbh.php";
        include "../classes/select.php";
        include "../classes/delete.php";
        include "../classes/inserts.php";
// echo $item;
        //get item details
        $get_item = new selects();
        $row = $get_item->fetch_details_group('items', 'item_name', 'item_id', $item);
        $name = $row->item_name;
        //get invoice
        $get_invoice = new selects();
        $rows = $get_invoice->fetch_details_cond('sales', 'sales_id', $sales);
        foreach($rows as $row){
                $invoice = $row->invoice;
                $quantity = $row->quantity;
                $price = $row->price;
        }
        //delete sales
        $delete = new deletes();
        $delete->delete_item('sales', 'sales_id', $sales);
        if($delete){
                //add to deleted items table
                $data = array(
                        'item' => $item,
                        'quantity' => $quantity,
                        'price' => $price,
                        'deleted_by' => $user,
                        'date_deleted' => $date,
                        'invoice' => $invoice,
                        'store' => $store
                );
                $add_item = new add_data('deleted_sales', $data);
                $add_item->create_data();
                
?>
<!-- display items with same invoice number -->
<div class="notify"><p><span><?php echo $name?></span> Removed from sales order</p></div>

</div>    
<?php
    include "sales_details.php";
            }            
        
    // }
?>