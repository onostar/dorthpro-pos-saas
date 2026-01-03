<?php
date_default_timezone_set("Africa/Lagos");
session_start();

include "view/cache_control.php";
include "classes/dbh.php";
include "classes/select.php";

if (isset($_SESSION['user'])) {
    header("Location: view/users.php");
    exit;
}

/**
 * FETCH SINGLE COMPANY
 * (If truly single-tenant, this is correct.
 * If multi-tenant later, fetch by domain or company_id)
 */
$get_company = new selects();
$rows = $get_company->fetch_details('companies');

if (!is_array($rows) || count($rows) === 0) {
    die("Company record not found.");
}

$row = $rows[0]; // ✅ USE ONLY ONE COMPANY

/* ===============================
   LICENSE & GRACE LOGIC
================================ */

$expiration_date = $row->due_date;          // YYYY-MM-DD
$current_date = date("Y-m-d");

$expiration_ts = strtotime($expiration_date);
$current_ts    = strtotime($current_date);

// 1-day grace period (24hrs)
$grace_ts = strtotime("+1 day", $expiration_ts);

// Days remaining (can be negative)
$days_remaining = floor(($expiration_ts - $current_ts) / 86400);

// License states
$is_active = $current_ts <= $expiration_ts;
$is_grace = $current_ts > $expiration_ts && $current_ts <= $grace_ts;
$is_expired = $current_ts > $grace_ts;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sales & Inventory Management | Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/icon.png">
    <link rel="stylesheet" href="fontawesome-free-6.0.0-web/css/all.min.css">
    <link rel="stylesheet" href="style.css?v=<?php echo APP_VERSION ?>">
</head>

<body>

<!-- ===============================
     LICENSE BANNERS
================================ -->

<?php if ($days_remaining <= 3 && $days_remaining > 0): ?>
    <div class="about_expire">
        <marquee>
            Heads up! Your software license will expire in 
            <?php echo $days_remaining; ?> day(s). Please renew to avoid interruption.
        </marquee>
    </div>
<?php endif; ?>

<?php if ($is_grace): ?>
    <div class="about_expire">
        <marquee>
            Your software license has expired. You are currently on a 1-day grace period.
            Please renew immediately to avoid shutdown.
        </marquee>
    </div>
<?php endif; ?>

<!-- ===============================
     ACCESS CONTROL
================================ -->

<?php if (!$is_expired): ?>
<main id="reg_body">
    <section class="reg_log">
        <div class="login_page">

            <div class="company_logo">
                <img src="<?php echo 'images/' . $row->logo; ?>" alt="<?php echo $row->company; ?>">
            </div>

            <p><?php echo $row->company; ?></p>

            <?php
            if (isset($_SESSION['success'])) {
                echo "<p class='success succeed'>{$_SESSION['success']}</p>";
                unset($_SESSION['success']);
            }

            if (isset($_SESSION['error'])) {
                echo "<p class='error succeed'>{$_SESSION['error']}</p>";
                unset($_SESSION['error']);
            }
            ?>

            <form action="controller/login.php" method="POST">
                <div class="data">
                    <label>Username</label>
                    <input type="text" name="username" required>
                </div>

                <div class="data">
                    <label>Password</label>
                    <input type="password" name="password" required>
                </div>

                <div class="data">
                    <button type="submit" name="submit_login">
                        Sign in <i class="fas fa-sign-in-alt"></i>
                    </button>
                </div>
            </form>

            <div class="software_logo">
                <img src="images/logo.png">
            </div>

            <div id="foot">
                <p>&copy; <?php echo date("Y"); ?> Dorthpro Digitals. All Rights Reserved.</p>
            </div>

        </div>
    </section>
</main>

<?php else: ?>

<!-- ===============================
     FULLY EXPIRED
================================ -->

<div class="expired_package">
    <p>
        Your software license has expired.<br>
        Please renew your license to continue using this system.
    </p>
    <div class="renewal">
        <a href="view/renew_package.php">
            Renew License <i class="fas fa-paper-plane"></i>
        </a>
    </div>
</div>

<?php endif; ?>

</body>
</html>
