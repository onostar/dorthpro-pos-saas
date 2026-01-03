<?php
    include "../classes/dbh.php";
    include "../classes/select.php";
?>

<div id="add_room" class="displays">
    <div class="info" style="width:80%; margin:0"></div>
    <div class="add_user_form" style="width:30%; margin:0">
        <h3 style="background:var(--moreColor)">Add Software Package/Plan</h3>
        <!-- <form method="POST" id="addUserForm"> -->
        <section class="addUserForm">
            <div class="inputs">
                <div class="data" style="width:100%; margin:10px 0;">
                    <label for="package">Package</label>
                    <input type="text" id="package" name="package">
                </div>
                <div class="data" style="width:100%; margin:10px 0">
                    <label for="monthly"> Monthly Subscription</label>
                    <input type="text" id="monthly" name="monthly">
                </div>
                <div class="data" style="width:100%; margin:10px 0">
                    <label for="monthly"> Bi-annual Subscription (Six months)</label>
                    <input type="text" id="six_months" name="six_months">
                </div>
                <div class="data" style="width:100%; margin:10px 0">
                    <label for="monthly"> Annual Subscription</label>
                    <input type="text" id="yearly" name="yearly">
                </div>
                
                <div class="data" style="width:auto; margin:10px 0">
                    <button type="button" id="add_item" name="add_item" onclick="addPackage()">Save record <i class="fas fa-save"></i></button>
                </div>
            </div>
        </section>    
    </div>
</div>
