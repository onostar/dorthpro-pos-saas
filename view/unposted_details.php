<div id="guest_details">
<?php
    session_start();
    include "../classes/dbh.php";
    include "../classes/select.php";
    include "../classes/update.php";
    if(isset($_SESSION['user_id'])){
        $user_id = $_SESSION['user_id'];
        // echo $user_id;
    
    if(isset($_GET['invoice'])){
        $invoice = $_GET['invoice'];
        //get invoice details

?>


<div class="displays all_details">
    <!-- <div class="info"></div> -->
    <button class="page_navs" id="back" onclick="showPage('unposted_transactions.php')"><i class="fas fa-angle-double-left"></i> Back</button>
    <div class="guest_name">
        <h4>Items on Invoice => <?php echo $invoice?> </h4>
       
        <div class="displays allResults" id="payment_det">
        
            <div class="payment_details">
                <h3>Invoice Details</h3>
                <table id="guest_payment_table" class="searchTable">
                    <thead>
                        <tr>
                            <td>S/N</td>
                            <td>Item</td>
                            <td>Quantity</td>
                            <td>Unit price</td>
                            <td>Discocunt</td>
                            <td>Amount</td>
                            <td>Total Discount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $n = 1;
                            $get_items = new selects();
                            $rows = $get_items->fetch_details_cond('sales', 'invoice', $invoice);
                            foreach($rows as $row){
                        ?>
                        <tr>
                            <td style="text-align:center; color:red;"><?php echo $n?></td>
                            <td>
                                <?php 
                                    //get item name
                                    $get_name = new selects();
                                    $names = $get_name->fetch_details_group('items', 'item_name', 'item_id', $row->item);
                                    echo strtoupper($names->item_name);
                                ?>
                            </td>
                            <td style="text-align:center; color:var(--otherColor)"><?php echo $row->quantity?></td>
                            <td><?php echo number_format($row->price, 2);?></td>
                            <?php if($row->discount > 0){?>
                            <td style='color:red'><?php echo "-".number_format($row->discount, 2);?></td>
                            <?php }elseif($row->discount < 0){?>
                            <td style='color:green'><?php echo "+".number_format(-($row->discount), 2);?></td>
                            <?php }else{?>
                                <td style='color:green'><?php echo number_format($row->discount, 2);?></td>
                            <?php }?>
                            <td><?php echo number_format($row->total_amount, 2)?></td>
                            
                            <td>
                            <?php 
                                $total_disc = $row->discount * $row->quantity;
                                if($total_disc > 0){
                                    echo "<span style='color:red'>-".number_format($total_disc, 2)."</span>";
                                }elseif($total_disc < 0){
                                    echo "<span style='color:green'>+".number_format(-($total_disc), 2)."</span>";
                                }else{
                                    echo "<span style='color:green'>".number_format($total_disc, 2)."</span>";
                                }
                            
                            ?>
                            
                            </td>
                            
                        </tr>
                        
                        <?php $n++; }?>
                    </tbody>
                </table>
            </div>
            <div class="amount_due">
                <h2>Total Amount: 
                <?php
                    //get total amount
                    $get_total = new selects();
                    $details = $get_total->fetch_sum_single('sales', 'total_amount', 'invoice', $invoice);
                    foreach($details as $detail){
                        echo "₦".number_format($detail->total, 2);
                    }
                ?>
                </h2>

                
            </div>
            
    </div>
    
</div>
<?php
            }
        
    }else{
        header("Location: ../index.php");
    }
?>
</div>