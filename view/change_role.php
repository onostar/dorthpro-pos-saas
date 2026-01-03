<?php

    include "../classes/dbh.php";
    include "../classes/select.php";


?>
<div class="displays allResults" id="staff_list" style="width:80%!important;margin:0 50px!important">
<div class="info"></div>

    <h2>Change User role</h2>
    <hr>
    <div class="search">
        <input type="search" id="searchStaff" placeholder="Enter keyword" onkeyup="searchData(this.value)">
    </div>
    <table id="room_list_table" class="searchTable">
        <thead>
            <tr style="background:var(--moreColor)">
                <td>S/N</td>
                <td>Full Name</td>
                <td>Username</td>
                <td>Role</td>
                <td>Date Reg</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_details = new selects();
                $details = $get_details->fetch_details_negCond1('users', 'username', 'Sysadmin');
                if(gettype($details) === 'array'){
                foreach($details as $detail):
            ?>
            <tr>
                <td style="text-align:center; color:red;"><?php echo $n?></td>
                <td><?php echo $detail->full_name?></td>
                <td style="color:var(--otherColor)"><?php echo $detail->username?></td>
                <td ><?php echo $detail->user_role?></td>
               
                <td><?php echo date("d-m-Y", strtotime($detail->reg_date))?></td>
                
                <td class="prices">
                    <a style="background:var(--otherColor)!important; color:#fff!important; padding:5px 8px; border-radius:10px;" href="javascript:void(0)" class="each_prices" onclick="getForm('<?php echo $detail->user_id?>', 'get_user_role.php');"><i class="fas fa-pen"></i></a>
                </td>
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