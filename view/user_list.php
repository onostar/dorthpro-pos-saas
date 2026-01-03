<?php

    include "../classes/dbh.php";
    include "../classes/select.php";


?>
    <div class="info"></div>
<div class="displays allResults" id="staff_list" style="width:80%!important;margin:10px 50px!important">
    <h2>List of users</h2>
    <hr>
    <div class="search">
        <input type="search" id="searchStaff" placeholder="Enter keyword" onkeyup="searchData(this.value)">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('user_list_table', 'List of users')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
    </div>
    <table id="user_list_table" class="searchTable">
        <thead>
            <tr style="background:var(--moreColor)">
                <td>S/N</td>
                <td>Full Name</td>
                <td>Username</td>
                <td>Role</td>
                <td>Store</td>
                <td>Date reg</td>
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_details = new selects();
                $details = $get_details->fetch_details_negCond('users', 'username', 'Sysadmin', 'status', 0);
                if(gettype($details) === 'array'){
                foreach($details as $detail):
            ?>
            <tr>
                <td style="text-align:center; color:red;"><?php echo $n?></td>
                <td><?php echo $detail->full_name?></td>
                <td style="color:var(--otherColor)"><?php echo $detail->username?></td>
                <td><?php echo $detail->user_role?></td>
                <td style="color:var(--primaryColor)">
                    <?php 
                        //get store
                        $get_store = new selects();
                        $str = $get_store->fetch_details_group('stores', 'store', 'store_id', $detail->store);
                        echo $str->store;
                    ?>
                </td>
                <td><?php echo date("d-m-Y", strtotime($detail->reg_date))?></td>
                
                
            </tr>
            
            <?php $n++; endforeach;}?>
        </tbody>
    </table>
    
    <?php
        if(gettype($details) == "string"){
            echo "<p class='no_result'>'$details'</p>";
        }
    ?>
</div>