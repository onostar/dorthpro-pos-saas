<?php
    include "../classes/inserts.php";
if ($_SESSION['role'] == 'Admin' || $_SESSION['role'] == 'Accountant'){
date_default_timezone_set('Africa/Lagos');
$today = date('Y-m-d');
$dayOfWeek = date('N'); // 1 = Monday, 7 = Sunday
$currentHour = date('H');

// Run only on Mondays between 1:00am and 12noon
if ($dayOfWeek == 1 && $currentHour >= 1 && $currentHour < 12) {
    /* $last_monday = date('Y-m-d', strtotime('last monday', strtotime($today)));
    $last_sunday = date('Y-m-d', strtotime('last sunday', strtotime($today))); */
    $last_monday = date('Y-m-d', strtotime('monday last week'));
    $last_sunday = date('Y-m-d', strtotime('sunday last week'));


    // Check if summary already exists for this weekfor this store
    $get_details = new selects();
    $check = $get_details->fetch_details_2cond('weekly_summary', 'store', 'week_start', $store_id, $last_monday);
    if(!is_array($check)){

    /* $stmt = $pdo->prepare("SELECT * FROM weekly_summary WHERE admin_id = ? AND week_start = ?");
    $stmt->execute([$admin_id, $last_monday]);
    $summary = $stmt->fetch(PDO::FETCH_ASSOC); */

    // if (!$summary) {
        // Calculate data
        // Example: Fetch total sales for last week and expenses
        $rows = $get_details->fetch_week_sales($store_id, $last_monday, $last_sunday);
        if(is_array($rows)){
            foreach($rows as $row){
                $last_week_sales = $row->revenue;
                $last_week_cost = $row->total_cost;
            }
        }else{
            $last_week_sales = 0;
            $last_week_cost = 0;
        }
        $last_week_gross_profit = $last_week_sales - $last_week_cost;
        //get last week expenses
        $exps = $get_details->fetch_week_expense($store_id, $last_monday, $last_sunday);
        if(is_array($exps)){
            foreach($exps as $exp){
                $last_week_expense = $exp->expense;
            }
        }else{
            $last_week_expense = 0;
        }
        $last_week_net_profit = $last_week_gross_profit - $last_week_expense;
        $total_sales = $last_week_sales;
        /* $sql = "SELECT SUM(amount) as total FROM sales WHERE admin_id = ? AND date BETWEEN ? AND ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$admin_id, $last_monday, $last_sunday]);
        $total_sales = $stmt->fetchColumn() ?? 0; */
        //get 
        // Compare with previous week
        $prev_start = date('Y-m-d', strtotime('-14 days', strtotime($today)));
        $prev_end = date('Y-m-d', strtotime('-8 days', strtotime($today)));

        //get previous week sales and expenses
        $prev_rows = $get_details->fetch_week_sales($store_id, $prev_start, $prev_end);
        if(is_array($prev_rows)){
            foreach($prev_rows as $prev_row){
                $prev_week_sales = $prev_row->revenue;
                $prev_week_cost = $prev_row->total_cost;
            }
        }else{
            $prev_week_sales = 0;
            $prev_week_cost = 0;
        }
        $prev_week_gross_profit = $prev_week_sales - $prev_week_cost;
        //get previous week expenses
        $prev_exps = $get_details->fetch_week_expense($store_id, $prev_start, $prev_end);
        if(is_array($prev_exps)){
            foreach($prev_exps as $prev_exp){
                $prev_week_expense = $prev_exp->expense;
            }
        }else{
            $prev_week_expense = 0;
        }
        $prev_week_net_profit = $prev_week_gross_profit - $prev_week_expense;
        $prev_sales = $prev_week_sales;
       /*  $stmt = $pdo->prepare($sql);
        $stmt->execute([$admin_id, $prev_start, $prev_end]);
        $prev_sales = $stmt->fetchColumn() ?? 0;
 */
        $percentage_change = ($prev_sales > 0) ? (($total_sales - $prev_sales) / $prev_sales) * 100 : 100;
        $trend_word = ($percentage_change >= 0) ? 'increase' : 'drop';

        // Get top selling item
        $highs = $get_details->fetch_weekly_highest($store_id, $last_monday, $last_sunday, 'SUM(total_amount)');
        if(is_array($highs)){
            foreach($highs as $high){
                $highest_item = $high->item;
                $highest_revenue = $high->revenue;
                $highest_qty = $high->total_quantity;
            }
        }else{
            $highest_item = 0;
            $highest_revenue = 0;
            $highest_qty = 0;
        }
        //get most sold item
        $mosts = $get_details->fetch_weekly_highest($store_id, $last_monday, $last_sunday, 'SUM(quantity)');
        if(is_array($mosts)){
            foreach($mosts as $most){
                $most_item = $most->item;
                $most_revenue = $most->revenue;
                $most_qty = $most->total_quantity;
            }
        }else{
            $most_item = 0;
            $most_revenue = 0;
            $most_qty = 0;
        }
       /*  $stmt = $pdo->prepare("SELECT item_name, SUM(quantity) AS qty FROM sales_items WHERE admin_id = ? AND date BETWEEN ? AND ? GROUP BY item_name ORDER BY qty DESC LIMIT 1");
        $stmt->execute([$admin_id, $last_monday, $last_sunday]);
        $top = $stmt->fetch(PDO::FETCH_ASSOC);
        $top_item = $top['item_name'] ?? 'N/A';
        $top_item_quantity = $top['qty'] ?? 0; */

        // Get most active cashier
        $cashs = $get_details->fetch_weekly_cashier($store_id, $last_monday, $last_sunday);
        if(is_array($cashs)){
            foreach($cashs as $cash){
                $cashier = $cash->posted_by;
                $customers = $cash->customers;
                $cashier_amount = $cash->revenue;
            }
        }else{
            $cashier = 0;
            $customers = 0;
            $cashier_amount = 0;
        }
        /* $stmt = $pdo->prepare("SELECT cashier_name, COUNT(*) AS sales_count FROM sales 
                               WHERE admin_id = ? AND date BETWEEN ? AND ?
                               GROUP BY cashier_name ORDER BY sales_count DESC LIMIT 1");
        $stmt->execute([$admin_id, $last_monday, $last_sunday]);
        $cashier = $stmt->fetch(PDO::FETCH_ASSOC);
        $top_cashier = $cashier['cashier_name'] ?? 'N/A'; */

        // Get low stock item
        $lows = $get_details->fetch_low_stock($store_id);
        if(is_array($lows)){
            foreach($lows as $low){
                $low_item = $low->item;
                $low_qty = $low->total_quantity;
            }
        }else{
            $low_item = 0;
            $low_qty = 0;
        }
        /* $stmt = $pdo->prepare("SELECT item_name FROM inventory WHERE admin_id = ? AND quantity <= 5 LIMIT 1");
        $stmt->execute([$admin_id]);
        $low_stock_item = $stmt->fetchColumn() ?? 'None'; */
        $last_week_sales = $last_week_sales ?? 0;
        $last_week_cost = $last_week_cost ?? 0;
        $last_week_expense = $last_week_expense ?? 0;
        $total_sales = $total_sales ?? 0;
        $last_week_gross_profit = $last_week_gross_profit ?? 0;
        $last_week_net_profit = $last_week_net_profit ?? 0;
        $percentage_change = $percentage_change ?? 0;
        $highest_revenue = $highest_revenue ?? 0;
        $hightest_qty = $hightest_qty ?? 0;
        $most_revenue = $most_revenue ?? 0;
        $most_qty = $most_qty ?? 0;
        $cashier_amount = $cashier_amount ?? 0;
        $customers = $customers ?? 0;
        $low_qty = $low_qty ?? 0;

        // Save summary
        $data = array(
            'store' => $store_id,
            'week_start' => $last_monday,
            'week_end' => $last_sunday,
            'total_sales' => $total_sales,
            'percentage_change' => $percentage_change,
            'expense' => $last_week_expense,
            'gross_profit' => $last_week_gross_profit,
            'net_profit' => $last_week_net_profit,
            'trend_word' => $trend_word,
            'top_item' => $highest_item,
            'top_item_quantity' => $highest_qty,
            'top_item_revenue' => $highest_revenue,
            'most_item' => $most_item,
            'most_item_quantity' => $most_qty,
            'most_item_revenue' => $most_revenue,
            'top_cashier' => $cashier,
            'cashier_customers' => $customers,
            'cashier_revenue' => $cashier_amount,
            'low_stock_item' => $low_item,
            'low_stock_qty' => $low_qty,
            'created_at' => date('Y-m-d H:i:s')

        );
        $add_data = new add_data('weekly_summary', $data);
        $add_data->create_data();
        /* $stmt = $pdo->prepare("INSERT INTO weekly_summary 
            (admin_id, week_start, week_end, total_sales, percentage_change, trend_word, 
            top_item, top_item_quantity, top_cashier, low_stock_item)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $admin_id, $last_monday, $last_sunday, $total_sales, $percentage_change, $trend_word,
            $top_item, $top_item_quantity, $top_cashier, $low_stock_item
        ]); */

        /* $summary = [
            'total_sales' => $total_sales,
            'percentage_change' => $percentage_change,
            'trend_word' => $trend_word,
            'top_item' => $top_item,
            'top_item_quantity' => $top_item_quantity,
            'top_cashier' => $top_cashier,
            'low_stock_item' => $low_stock_item,
        ]; */
    }
    //get weekly summary details
    $summary_data = $get_details->fetch_details_2cond('weekly_summary', 'store', 'week_start', $store_id, $last_monday);
    if(is_array($summary_data)){
        foreach($summary_data as $summ){
            $summary = array(
                'total_sales' => $summ->total_sales,
                'expense' => $summ->expense,
                'net_profit' => $summ->net_profit,
                'percentage_change' => $summ->percentage_change,
                'trend_word' => $summ->trend_word,
                'top_item' => $summ->top_item,
                'top_item_quantity' => $summ->top_item_quantity,
                'top_item_revenue' => $summ->top_item_revenue,
                'most_item' => $summ->most_item,
                'most_item_quantity' => $summ->most_item_quantity,
                'most_item_revenue' => $summ->most_item_revenue,
                'top_cashier' => $summ->top_cashier,
                'cashier_customers' => $summ->cashier_customers,
                'cashier_revenue' => $summ->cashier_revenue,
                'low_stock_item' => $summ->low_stock_item,
                'low_stock_qty' => $summ->low_stock_qty
            );
        }
    }else{
        $summary = array(
            'total_sales' => 0,
            'percentage_change' => 0,
            'expense' => 0,
            'net_profit' => 0,
            'trend_word' => 'N/A',
            'top_item' => 'N/A',
            'top_item_quantity' => 0,
            'top_item_revenue' => 0,
            'most_item' => 'N/A',
            'most_item_quantity' => 0,
            'most_item_revenue' => 0,
            'top_cashier' => 'N/A',
            'cashier_customers' => 0,
            'cashier_revenue' => 0,
            'low_stock_item' => 'N/A',
            'low_stock_qty' => 0
        );
    }
    // Pass to frontend
    $show_weekly_summary = true;
}
}
?>
