
<?php
    session_start();
    $store = $_SESSION['store_id'];
    $from = htmlspecialchars(stripslashes($_POST['from_date']));
    $to = htmlspecialchars(stripslashes($_POST['to_date']));

    // instantiate classes
    include "../classes/dbh.php";
    include "../classes/select.php";
    //get store
    $get_store = new selects();
    $str = $get_store->fetch_details_group('stores', 'store', 'store_id', $store);
    $store_name = $str->store;
    
?>
<!-- <hr> -->
<div class="search">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'Income Statement from <?php echo date('Y-m-d', strtotime($from))?> to <?php echo date('Y-m-d', strtotime($to))?>')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
    </div>
    <h2 style="background:var(--tertiaryColor); color:#fff; padding:10px;">Income statement between "<?php echo date("jS M, Y", strtotime($from))?>" and "<?php echo date("jS M, Y", strtotime($to))?>"</h2>
    
    <table id="data_table" class="searchTable">
        <thead>
            <tr style="background:var(--tertiaryColor)">
                <td>Details</td>
                <td>Amount (₦)</td>
                <!-- <td>Account No.</td>
                <td>Debit</td>
                <td>Credit</td> -->
            </tr>
        </thead>
        <tbody>
            <?php
                 $get_total = new selects();
                 $amounts = $get_total->fetch_revenueDate($from, $to, $store);
                 if(is_array($amounts)){
                    foreach($amounts as $amount){
                        $revenue = $amount->total;
                        $costSales = $amount->total_cost;
                    }
                }
            ?>
            <tr>
                <td style="color:#222;text-align:left">Revenue</td>
                <td>
                    <?php
                        
                        echo number_format($revenue, 2)
                    ?>
                </td>
            </tr>
            <tr>
                <td style="color:#222;text-align:left">Cost of Goods Sold (COGS)</td>
                <td>
                    <?php
                        
                        echo number_format($costSales, 2)
                    ?>
                </td>
            </tr>
            <tr>
                <td style="color:#222;text-align:left;font-weight:bold; text-transform:uppercase">Gross Profit</td>
                <td style="font-weight:bold;">
                    <?php
                        $gross_profit = $revenue - $costSales;
                        echo number_format($gross_profit, 2);
                    ?>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="color:#222;text-align:left;text-transform:uppercase">Operating Expense</td>
            </tr>
            <?php
                //get all expenses
                $get_exp = new selects();
                $exps = $get_exp->fetch_details('expense_heads');
                foreach($exps as $exp){
            ?>
            <tr>
                <td style="color:#222;text-align:left"><?php echo $exp->expense_head?></td>
                <td>
                    <?php
                        //get expense amount
                        $exp_am = $get_exp->fetch_sum_2date2Cond('expenses', 'amount', 'date(post_date)', 'store', 'expense_head', $from, $to, $store, $exp->exp_head_id);
                        if(is_array($exp_am)){
                            foreach($exp_am as $exp_amount){
                                $expense = $exp_amount->total;
                            }
                        }else{
                            $expense = 0;
                        }
                        echo number_format($expense, 2);
                        
                    ?>
                </td>
            </tr>
            <?php } ?>
            <tr>
                <td style="color:#222;text-align:left;font-weight:bold; text-transform:uppercase">Total Expense</td>
                <td style="font-weight:bold;">
                    <?php
                       $total_exps = $get_exp->fetch_sum_2dateCond('expenses', 'amount', 'store', 'date(post_date)', $from, $to, $store);
                       if(is_array($total_exps)){
                           foreach($total_exps as $total_exp){
                               $total_expense = $total_exp->total;
                           }
                       }else{
                           $total_expense = 0;
                       }
                       echo number_format($total_expense, 2);
                    ?>
                </td>
            </tr>
        </tbody>
    </table>
    
<?php
    // get sum
    /* $total_profit = ($revenue + $other_revenue) - ($cost + $total_expense + $logistic + $finance_cost + $loss + $depreciation); */
    //get expense
    
    //get other revenue
    $total_profit = $revenue - ($costSales + $total_expense);
    // $total_profit = $revenue - $expense;
    if($total_profit >= 0){
        echo "<p class='total_amount' style='background:var(--tertiaryColor); color:#fff; text-decoration:none; padding:10px; width:auto; float:right'>Net Profit: ₦".number_format($total_profit, 2)."</p>";
    }else{
        echo "<p class='total_amount' style='background:red; color:#fff; text-decoration:none; padding:10px; width:auto; float:right'>Net Loss: ₦".number_format($total_profit, 2)."</p>";
    }
?>
