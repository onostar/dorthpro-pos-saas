<?php
   
    if(isset($_GET['invoice'])){
?>
<style>
    label{
        font-size:.9rem!important;
    }
</style>
<div id="update_customer" class="displays">
    <div class="info"></div>
    <div class="add_user_form" style="width:70%; margin:0">
        <h3 style="background:var(--otherColor)">Add New customer</h3>
        <!-- <form method="POST" id="addUserForm"> -->
        <form class="addUserForm">
            <div class="inputs" style="gap:.5rem;">
                <div class="data" style="width:30%">
                    <label for="customer">Customer Name</label>
                    <input type="text" name="customer" id="customer" placeholder="Enter customer name" required>
                </div>
                <div class="data" style="width:30%">
                    <label for="phone_number">Phone number</label>
                    <input type="text" name="phone_number" id="phone_number" placeholder="0033421100" required>
                </div>
                <div class="data" style="width:30%">
                    <label for="Address">Address</label>
                    <input type="text" name="address" id="address" required>
                </div>
                <div class="data" style="width:30%">
                    <label for="email">Email address</label>
                    <input type="email" name="email" id="email" placeholder="example@mail.com" required>
                </div>
                <div class="data" style="width:65%">
                    <label for="social_media">Social Media Handles</label>
                    <input type="text" name="social_media" id="social_media" placeholder="enter social media handles" required>
                </div>
                
                <div class="data" style="width:auto">
                    <button type="button" id="add_customer" name="add_customer" onclick="addSalesCustomer()">Add Customer <i class="fas fa-plus"></i></button>
                    <a href="javascript:void(0)" onclick="document.getElementById('add_customer').html('')" style="background:brown; color:#fff; border-radius:15px; padding:8px; border:1px solid #fff; box-shadow: 1px 1px 1px #222">Close <i class="fas fa-close"></i></a>
                </div>
            </div>
        </form>    
    </div>
</div>
<?php }?>