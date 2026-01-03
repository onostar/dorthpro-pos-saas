<?php
session_start();
$store = $_SESSION['store_id'];
include "../classes/dbh.php";
include "../classes/select.php";
$role = $_SESSION['role'];

// get store name (safe)
$get_store = new selects();
$strs = $get_store->fetch_details_group('stores', 'store', 'store_id', $store);
$store_name = $strs->store;
?>
<div class="info"></div>
<div class="displays allResults" id="bar_items">
    <h2><?php echo htmlspecialchars($store_name); ?> Stock Balance</h2>
    <hr>

    <div class="search">
        <input type="search" id="searchRoom" placeholder="Search category or item name...">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'Stock balance')" title="Download to Excel">
            <i class="fas fa-file-excel"></i>
        </a>
    </div>

    <div id="table_container">
        <table id="data_table" class="searchTable">
            <thead>
                <tr style="background:var(--moreColor)">
                    <td>S/N</td>
                    <td>Category</td>
                    <td>Item name</td>
                    <td>Quantity</td>
                    <?php if ($role === "Admin") { ?>
                        <td>Unit cost</td>
                        <td>Total cost</td>
                    <?php } ?>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <?php
                $n = 1;
                $get_items = new selects();
                $details = $get_items->fetch_stock_balance($store);

                if (is_array($details) && count($details) > 0) {
                    foreach ($details as $detail) {
                        // ensure properties exist
                        $category = $detail->category_name ?? '';
                        $item_name = $detail->item_name ?? '';
                        $qty = $detail->total_qty ?? 0;
                        $cost = $detail->cost_price ?? 0;
                        $item_id = $detail->item_id ?? ($detail->item ?? '');
                        ?>
                        <tr>
                            <td style="text-align:center; color:red;"><?php echo $n; ?></td>
                            <td style="color:var(--moreColor);"><?php echo htmlspecialchars($category); ?></td>
                            <td style="color:var(--otherColor)"><?php echo htmlspecialchars($item_name); ?></td>
                            <td style="text-align:center; color:green;"><?php echo htmlspecialchars($qty); ?></td>

                            <?php if ($role === "Admin") { ?>
                                <td><?php echo "₦" . number_format($cost, 2); ?></td>
                                <td><?php echo "₦" . number_format($cost * $qty, 2); ?></td>
                            <?php } ?>

                            <td>
                                <a style="padding:5px; border-radius:15px; background:var(--tertiaryColor); color:#fff;"
                                   href="javascript:void(0)"
                                   onclick="showPage('view_item_batch.php?item=<?php echo urlencode($item_id); ?>')"
                                   title="View batches">view <i class="fas fa-eye"></i></a>
                            </td>
                        </tr>
                        <?php
                        $n++;
                    }
                } else {
                    // compute colspan depending on role
                    $colspan = ($role === "Admin") ? 7 : 5;
                    echo "<tr><td colspan='{$colspan}' style='text-align:center; color:red;'>No records found</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <?php
        if ($role === "Admin") {
            $get_total = new selects();
            $amounts = $get_total->fetch_sum_2colCond('inventory', 'cost_price', 'quantity', 'store', $store);
            $total_amount = 0;
            if (is_array($amounts)) {
                foreach ($amounts as $amount) {
                    $total_amount = $amount->total ?? 0;
                }
            }
            echo "<p class='total_amount'>Store worth: ₦" . number_format($total_amount, 2) . "</p>";
        }
        ?>
    </div>
</div>
<!-- NOTE: Do NOT put any script inside the table. JS must be in your global file. -->
