<?php
    /* session_start();
    $store = $_SESSION['store_id'];
    include "../classes/dbh.php";
    include "../classes/select.php"; */


?>
<!--<div id="revenueReport" class="displays management" style="margin:0!important">
    <div class="select_date">
       
        <section>    
            <div class="from_to_date">
                <label>Select From Date</label><br>
                <input type="date" name="from_date" id="from_date"><br>
            </div>
            <div class="from_to_date">
                <label>Select to Date</label><br>
                <input type="date" name="to_date" id="to_date"><br>
            </div>
            <button type="submit" name="search_date" id="search_date" onclick="search('search_profit.php')">Search <i class="fas fa-search"></i></button>
</section>
    </div>
<div class="displays allResults new_data" id="revenue_report" style="width:60%">
    <hr>
    <h2 style="background:var(--otherColor); color:#fff; padding:10px;">Profit and Loss statement for "<?php echo date("jS M, Y")?>"</h2>
    <div class="profitNloss">
        <?php
            // get accounts
            /* $get_account = new selects();
            $rows = $get_account->fetch_revenue($store);
            foreach($rows as $row){ */
        ?>
        <div class="prof_loss">
            <div class="prof">
                <h3><i class="fas fa-money-check"></i> Revenue</h3>
            </div>
            <div class="prof">
                <p><?php /* echo "₦".number_format($row->total, 2) */?></p>
            </div>
        </div>
        <div class="prof_loss">
            <div class="prof">
                <h3><i class="fas fa-coins"></i> Cost of sales</h3>
            </div>
            <div class="prof">
                <p><?php /* echo "₦".number_format($row->total_cost, 2) */?></p>
            </div>
        </div>
        <div class="prof_loss">
            <?php
                //get expense
                /* $get_exp = new selects();
                $exps = $get_exp->fetch_sum_curdateCon('expenses', 'amount', 'date(post_date)', 'store', $store);
                foreach($exps as $exp){ */
            ?>
            <div class="prof">
                <h3><i class="fas fa-hand-holding-dollar"></i> Expense</h3>
            </div>
            <div class="prof">
                <p><?php /* echo "₦".number_format($exp->total, 2) */?></p>
            </div>
            <?php /* } */?>
        </div>
        <?php /* } */?>
    </div>
        
    
    <?php

        // get sum
        /* $get_total = new selects();
        $amounts = $get_total->fetch_revenue($store);
        foreach($amounts as $amount){
            $revenue = $amount->total;
            $costSales = $amount->total_cost;
            $expense = $exp->total;
            $total_profit = $revenue - ($costSales + $expense);
            echo "<p class='total_amount' style='background:red; color:#fff; text-decoration:none; padding:10px; width:30%; float:right'>Net Profit: ₦".number_format($total_profit, 2)."</p>";
        } */
    ?>

</div>

<script src="../jquery.js"></script>
<script src="../script.js"></script> -->
<?php
    session_start();
    $store = $_SESSION['store_id'];
    include "../classes/dbh.php";
    include "../classes/select.php";

    //get store
    $get_store = new selects();
    $str = $get_store->fetch_details_group('stores', 'store', 'store_id', $store);
    $store_name = $str->store;
?>
<div id="revenueReport" class="displays management" style="width:90%!important;margin:20px!important">
    <div class="select_date">
        <!-- <form method="POST"> -->
        <section>    
            <div class="from_to_date" style="width:30%">
                <label>Select From Date</label><br>
                <input type="date" name="from_date" id="from_date"><br>
            </div>
            <div class="from_to_date" style="width:30%">
                <label>Select to Date</label><br>
                <input type="date" name="to_date" id="to_date"><br>
            </div>
            <button type="submit" name="search_date" id="search_date" onclick="search('search_profit.php')">Search <i class="fas fa-search"></i></button>
</section>
    </div>
<div class="displays allResults new_data" id="revenue_report" style="width:60%">
    <!-- <hr> -->
    <div class="search">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'Income Statement for <?php echo date('Y-m-d')?>')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
    </div>
    <h2 style="background:var(--tertiaryColor); color:#fff; padding:10px;">Income statement for "<?php echo date("jS M, Y")?>"</h2>
    
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
                // get accounts
                $get_account = new selects();
                $rows = $get_account->fetch_revenue($store);
                if(gettype($rows) == "array"){
                    foreach($rows as $row){
                        $revenue = $row->total;
                        $cost = $row->total_cost;
                    }
                }
            ?>
            <tr>
                <td style="color:#222;text-align:left">Revenue</td>
                <td>
                    <?php
                       
                        echo number_format($revenue, 2);
                    ?>
                </td>
            </tr>
            <tr>
                <td style="color:#222;text-align:left">Cost of Goods Sold (COGS)</td>
                <td>
                    <?php
                        
                        echo number_format($cost, 2);
                    ?>
                </td>
            </tr>
            <tr>
                <td style="color:#222;text-align:left;font-weight:bold; text-transform:uppercase">Gross Profit</td>
                <td style="font-weight:bold;">
                    <?php
                        $gross_profit = $revenue - $cost;
                        echo number_format($gross_profit, 2);
                    ?>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="color:#222;text-align:left; text-transform:uppercase">Operating Expenses</td>
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
                        $exp_am = $get_exp->fetch_sum_curdate2Con('expenses', 'amount', 'date(post_date)', 'store', $store, 'expense_head', $exp->exp_head_id);
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
                       $total_exps = $get_exp->fetch_sum_curdateCon('expenses', 'amount', 'date(post_date)', 'store', $store);
                       if(gettype($total_exps) == "array"){
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
        
            // $total_profit = ($revenue + $other_revenue) - ($total_cost + $expense + $charges + $finance_cost + $loss);
            /* $total_profit = ($revenue + $other_revenue) - ($cost + $logistic + $total_expense  + $finance_cost + $loss + $depreciation); */
            
            //get other revenue
            $total_profit = $revenue - ($cost + $total_expense);
            // $total_profit = $revenue - $expense;
            if($total_profit >= 0){
                echo "<p class='total_amount' style='background:var(--tertiaryColor); color:#fff; text-decoration:none; padding:10px; width:auto; float:right'>Net Profit: ₦".number_format($total_profit, 2)."</p>";
            }else{
                echo "<p class='total_amount' style='background:red; color:#fff; text-decoration:none; padding:10px; width:auto; float:right'>Net Loss: ₦".number_format($total_profit, 2)."</p>";
            }
    ?>

</div>

<script src="../jquery.js"></script>
<script src="../script.js"></script>