<?php
// session_start();
// instantiate class
include "../classes/dbh.php";
include "../classes/update.php";
include "../classes/select.php";
include "../classes/inserts.php";
date_default_timezone_set("Africa/Lagos");

    session_start();
    if(isset($_SESSION['user_id'])){
        $trans_type = "sales";
            $user = $_SESSION['user_id'];
            $invoice = $_POST['sales_invoice'];
            $payment_type = htmlspecialchars(stripslashes($_POST['payment_type']));
            $bank = htmlspecialchars(stripslashes($_POST['bank']));
            $cash = htmlspecialchars(stripslashes($_POST['multi_cash']));
            $pos = htmlspecialchars(stripslashes($_POST['multi_pos']));
            $transfer = htmlspecialchars(stripslashes($_POST['multi_transfer']));
            $discount = htmlspecialchars(stripslashes($_POST['discount']));
            $store = htmlspecialchars(stripslashes($_POST['store']));
            $type = "Retail";
            // $customer = 0;
            $customer = htmlspecialchars(stripslashes($_POST['customer_id']));
            $date = date("Y-m-d H:i:s");
            //insert into audit trail
            //get items and quantity sold in the invoice
            $get_item = new selects();
            $items = $get_item->fetch_details_cond('sales', 'invoice', $invoice);
            foreach($items as $item){
                $all_item = $item->item;
                $sold_qty = $item->quantity;
                //get item previous quantity in inventory
                $get_qty = new selects();
                $prev_qtys = $get_qty->fetch_sum_double('inventory', 'quantity', 'store', $store, 'item', $all_item);
                foreach($prev_qtys as $prev_qty){    
                    //insert into audit trail
                    $audit_data = array(
                        'item' => $all_item,
                        'transaction' => $trans_type,
                        'previous_qty' => $prev_qty->total,
                        'quantity' => $sold_qty,
                        'posted_by' => $user,
                        'store' => $store,
                        'post_date' => $date
                    );
                    $insert_trail = new add_data('audit_trail', $audit_data);
                    $insert_trail->create_data();
                    /* $inser_trail = new audit_trail($all_item, $trans_type, $prev_qty->total, $sold_qty, $user, $store);
                    $inser_trail->audit_trail(); */
                
                }
            }
            
        //check if mode is multiple payment
        /* $get_mode = new selects();
        $mode = $get_mode->fetch_details_group('payments', 'payment_mode', 'invoice', $invoice);
        $paymode = $mode->payment_mode; */

        //update all items with this invoice

        $update_invoice = new Update_table();
        $update_invoice->update('sales', 'sales_status', 'invoice', 2, $invoice);
        //update quantity of the items in inventory
        //get all items first in the invoice
        $get_items = new selects();
        $rows = $get_items->fetch_details_cond('sales', 'invoice', $invoice);
        
        foreach($rows as $row){
            //update individual quantity in inventory
            
            $update_qty = new Update_table();
            $update_qty->update_inv_qty2($row->quantity, $row->item, $store);
            
        }
            if($update_invoice){
                //insert payment details into payment table
                //get invoice total amount
                $get_inv_total = new selects();
                $results = $get_inv_total->fetch_sum_single('sales', 'total_amount', 'invoice', $invoice);
                foreach($results as $result){
                    $inv_amount = $result->total;
                }
                //get amount paid
                // $amount_paid = $inv_amount - $discount;
                $amount_paid = $inv_amount;
                //insert payments
                if($payment_type == "Multiple"){
                    //insert into payments
                    if($cash !== 0){
                        $cash_data = array(
                            'sales_type' => $type,
                            'customer' => $customer,
                            'amount_due' => $cash,
                            'amount_paid' => $cash,
                            'payment_mode' => 'Cash',
                            'discount' => $discount,
                            'bank' => $bank,
                            'post_date' => $date,
                            'invoice' => $invoice,
                            'store' => $store,
                            'posted_by' => $user
                        );
                        $insert_payment = new add_data('payments', $cash_data);
                        $insert_payment->create_data();
                        /* $insert_payment = new payments($user, 'Cash', $bank, $cash, $cash, $discount, $invoice, $store, $type, $customer, $date);
                        $insert_payment->payment(); */
                    }
                    if($pos !== 0){
                        $pos_data = array(
                            'sales_type' => $type,
                            'customer' => $customer,
                            'amount_due' => $pos,
                            'amount_paid' => $pos,
                            'payment_mode' => 'POS',
                            'discount' => $discount,
                            'bank' => $bank,
                            'post_date' => $date,
                            'invoice' => $invoice,
                            'store' => $store,
                            'posted_by' => $user
                        );
                        $insert_payment = new add_data('payments', $pos_data);
                        $insert_payment->create_data();
                        /* $insert_payment = new payments($user, 'POS', $bank, $pos, $pos, $discount, $invoice, $store, $type, $customer, $date);
                        $insert_payment->payment(); */
                    }
                    if($transfer !== 0){
                        $transfer_data = array(
                            'sales_type' => $type,
                            'customer' => $customer,
                            'amount_due' => $transfer,
                            'amount_paid' => $transfer,
                            'payment_mode' => 'Transfer',
                            'discount' => $discount,
                            'bank' => $bank,
                            'post_date' => $date,
                            'invoice' => $invoice,
                            'store' => $store,
                            'posted_by' => $user
                        );
                        $insert_payment = new add_data('payments', $transfer_data);
                        $insert_payment->create_data();
                        /* $insert_payment = new payments($user, 'Transfer', $bank, $transfer, $transfer, $discount, $invoice, $store, $type, $customer, $date);
                        $insert_payment->payment(); */
                    }
                    //
                    $multi_data = array(
                        'posted_by' => $user,
                        'invoice' => $invoice,
                        'cash' => $cash,
                        'transfer' => $transfer,
                        'pos' => $pos,
                        'bank' => $bank,
                        'post_date' => $date
                    );
                    $insert_multi = new add_data('multiple_payments', $multi_data);
                    $insert_multi->create_data();
                   /*  $insert_multi = new multiple_payment($user, $invoice, $cash, $pos, $transfer, $bank, $store, $date);
                    $insert_multi->multi_pay(); */
                }else{
                    $payment_data = array(
                        'sales_type' => $type,
                        'customer' => $customer,
                        'amount_due' => $inv_amount,
                        'amount_paid' => $amount_paid,
                        'payment_mode' => $payment_type,
                        'discount' => $discount,
                        'bank' => $bank,
                        'post_date' => $date,
                        'invoice' => $invoice,
                        'store' => $store,
                        'posted_by' => $user
                    );
                    $insert_payment = new add_data('payments', $payment_data);
                    $insert_payment->create_data();
                   
                }
                
                if($insert_payment){
                //update customer details on sales table
                $update = new Update_table;
                $update->update('sales', 'customer', 'invoice', $customer, $invoice);
                
                
?>
<div id="printBtn">
    <button onclick="printSalesReceipt('<?php echo $invoice?>')">Print Receipt <i class="fas fa-print"></i></button>
</div>
<!--  -->
   
<?php
    // echo "<script>window.print();</script>";
                    // }
                }
            }
        
    }else{
        header("Location: ../index.php");
    } 
?>