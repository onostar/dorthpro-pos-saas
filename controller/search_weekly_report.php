<?php
session_start();
$store_id = $_SESSION['store_id'];
$from = !empty($_POST['from_date']) ? htmlspecialchars(stripslashes($_POST['from_date'])) : null;
$to = !empty($_POST['to_date']) ? htmlspecialchars(stripslashes($_POST['to_date'])) : null;
$from_day = date('N', strtotime($from));
$to_day = date('N', strtotime($to));
if($from_day != 1 || $to_day != 7){
    die('❌ Please select a valid Monday to Sunday range.');
}
$last_monday = date('Y-m-d', strtotime($from));
$last_sunday = date('Y-m-d', strtotime($to));

include "../classes/dbh.php";
include "../classes/select.php";
// Check if summary already exists for this weekfor this store
$get_details = new selects();
//get user name
$nms = $get_details->fetch_details_group('users', 'full_name', 'user_id', $_SESSION['user_id']);
$fullname = $nms->full_name;
$summary_data = $get_details->fetch_details_3cond('weekly_summary', 'store', 'week_start', 'week_end', $store_id, $last_monday, $last_sunday);
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
?>

    <div class="weekly_summary_report_card">
        <h4>👋 Hello <?= htmlspecialchars(ucwords($fullname)) ?>!</h4>
        <p>Here’s a quick look at your business performance last week 
           (<?= date('M d, Y', strtotime($last_monday)) ?> - <?= date('M d, Y', strtotime($last_sunday)) ?>):</p>

        <ul>
            <li>💸 <strong>Total Sales:</strong> ₦<?= number_format($summary['total_sales'],2) ?></li>
            <li>💼 <strong>Total Expenses:</strong> ₦<?= number_format($summary['expense'],2) ?></li>
            <li>💰 <strong>Net Profit:</strong> ₦<?= number_format($summary['net_profit'],2) ?></li>
            <li>📊 <strong>Weekly Performance:</strong> <?= round($summary['percentage_change'],2) ?>% <?= $summary['trend_word'] ?> compared to the previous week</li>

            <?php
                // Top selling product by revenue
                $item_name = "N/A";
                $names = $get_details->fetch_details_cond('items', 'item_id', htmlspecialchars($summary['top_item']));
                if(!empty($names)){
                    foreach($names as $name){ $item_name = $name->item_name; }
                }
            ?>
            <li>🏆 <strong>Top-Earning Product:</strong> <?= $item_name ?> (₦<?= number_format($summary['top_item_revenue'],2) ?> from <?= $summary['top_item_quantity'] ?> sold)</li>

            <?php
                // Most sold item by quantity
                $most_name = "N/A";
                $mosss = $get_details->fetch_details_cond('items', 'item_id', htmlspecialchars($summary['most_item']));
                if(!empty($mosss)){
                    foreach($mosss as $moss){ $most_name = $moss->item_name; }
                }
            ?>
            <li>📦 <strong>Most Sold Item:</strong> <?= $most_name ?> (<?= $summary['most_item_quantity'] ?> units)</li>

            <?php
                // Top cashier
                $cashier_name = "N/A";
                $cashiers = $get_details->fetch_details_cond('users', 'user_id', htmlspecialchars($summary['top_cashier']));
                if(!empty($cashiers)){
                    foreach($cashiers as $cashier){ $cashier_name = $cashier->full_name; }
                }
            ?>
            <li>🧾 <strong>Top Cashier:</strong> <?= strtoupper($cashier_name) ?> 
                (<?= $summary['cashier_customers'] ?> customers served, ₦<?= number_format($summary['cashier_revenue'],2) ?> in sales)</li>

            <?php
                // Low stock alert
                $low_stock_name = "N/A";
                $low_names = $get_details->fetch_details_cond('items', 'item_id', htmlspecialchars($summary['low_stock_item']));
                if(!empty($low_names)){
                    foreach($low_names as $low_name){ $low_stock_name = $low_name->item_name; }
                }
            ?>
            <li>⚠️ <strong>Low Stock Alert:</strong> <?= $low_stock_name ?> is running low 
                (only <?= $summary['low_stock_qty'] ?> left). 
                <a href="javascript:void(0)" 
                   style="text-decoration:underline; color:var(--tertiaryColor)" 
                   onclick="showPage('reached_reorder.php')">Review stock</a>
            </li>
        </ul>

        <?php if($summary['percentage_change'] > 0){ ?>
            <p style="margin-top:10px;">✨ Excellent job, <?= htmlspecialchars(ucwords($fullname)) ?>! Your performance improved — keep up the great work and aim higher this week 🚀</p>
        <?php } elseif($summary['percentage_change'] < 0){ ?>
            <p style="margin-top:10px;">📉 Sales dropped a bit this week. Don’t worry — analyze what changed and plan a comeback. Every week’s a new chance to win! 💪</p>
        <?php } else { ?>
            <p style="margin-top:10px;">🔄 Steady performance this week! Consistency builds success — keep going strong and look for new opportunities to grow 🌟</p>
        <?php } ?>

        <!-- <div style="text-align:center; margin-top:15px;">
            <a href="javascript:void(0)" 
               style="padding:6px 12px; border-radius:20px; box-shadow:1px 1px 3px #333; background:brown; color:#fff; font-weight:bold;"
               onclick="hideSummary()">Close <i class="fas fa-close"></i></a>
        </div> -->
    </div>


<?php 
}else{
    echo "<!-- No summary available -->";
}


?>
