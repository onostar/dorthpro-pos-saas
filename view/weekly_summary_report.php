<style>
    /* ===== Weekly Card (Desktop Default) ===== */
    #weekly_report_card {
        width: 80%;
        margin:10px 50px;
        /* position: fixed;
        top: 10vh;
        left: 100%;
        z-index: 999; */
        /* transition: all 0.8s ease-in-out; */
    }
    /* #weekly_card.show {
        left: 20%;
    } */

    .weekly_summary_report_card {
        width: 100%;
        margin: 20px auto;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.15);
        background: #ffffff;
        border-left: 5px solid var(--primaryColor);
        padding: 20px;
        border-radius: 12px;
        font-size: 0.9rem;
        overflow-y: auto;
        min-height: 50vh;
        animation: fadeIn 1s ease;
    }

    .weekly_summary_report_card h4 {
        margin: 4px 0;
        color: var(--primaryColor);
    }

    .weekly_summary_report_card li {
        padding: 6px 0;
        list-style-type: disc;
        line-height: 1.5;
        list-style: none;
    }

    /* ===== Desktop Animation ===== */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* ===== Mobile Optimization (≤800px) ===== */
    @media screen and (max-width:800px) {
        #weekly_report_card {
            width: 90%;
            left: 5%;
            top: 12vh;
            /* transition: all 0.7s ease-in-out; */
        }

        /* #weekly_card.show {
            left: 5%;
            top: 5vh;
        } */

        .weekly_summary_report_card {
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.1);
            animation: fadeInMobile 0.8s ease;
            font-size: 0.8rem;
            height:90vh;
        }
       
        /* Softer fade & lift for mobile */
        @keyframes fadeInMobile {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.98);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    }
</style>

<?php
include "../classes/dbh.php";
include "../classes/select.php";
session_start();
$store_id = $_SESSION['store_id'];
date_default_timezone_set('Africa/Lagos');
?>
<div class="select_date">
        <!-- <form method="POST"> -->
        <section>    
            <div class="from_to_date">
                <label>Select From Date</label><br>
                <input type="date" name="from_date" id="from_date"><br>
            </div>
            <div class="from_to_date">
                <label>Select to Date</label><br>
                <input type="date" name="to_date" id="to_date"><br>
            </div>
            <button type="submit" name="search_date" id="search_date" onclick="search('search_weekly_report.php')">Search <i class="fas fa-search"></i></button>
        </section>
    </div>
<div id="weekly_report_card" class="new_data">
<?php
$today = date('Y-m-d');
$dayOfWeek = date('N'); // 1 = Monday, 7 = Sunday
$currentHour = date('H');
$last_monday = date('Y-m-d', strtotime('monday last week'));
$last_sunday = date('Y-m-d', strtotime('sunday last week'));
// Check if summary already exists for this weekfor this store
$get_details = new selects();
//get user name
$nms = $get_details->fetch_details_group('users', 'full_name', 'user_id', $_SESSION['user_id']);
$fullname = $nms->full_name;
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
?>
    <div class="weekly_summary_report_card">
        <h4>👋 Hello <?= htmlspecialchars(ucwords($fullname)) ?>! I’m your DorthPro Smart Assistant</h4>
        <p>Here’s a quick look at your business performance last week (<?= date('M d, Y', strtotime($last_monday)) ?> - <?= date('M d, Y', strtotime($last_sunday)) ?>):</p>
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
</div>

<script>
    // Slide in the summary card after short delay
/*     window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('weekly_card').classList.add('show');
        }, 600);
    });

    // Function to close (slide out)
    function hideSummary(){
        document.getElementById('weekly_card').classList.remove('show');
        setTimeout(() => {
            document.getElementById('weekly_card').style.display = 'none';
        }, 800);
    } */
</script>

