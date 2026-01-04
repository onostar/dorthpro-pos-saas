<?php
    session_start();
    include "../classes/dbh.php";
    include "../classes/select.php";
    $store = $_SESSION['store_id'];

?>
<style>
    @media screen and (max-width: 800px){
        table td{
            font-size:.75rem;
        }
    }
</style>
<div id="purchaseReport" class="displays management" style="margin:0!important;width:100%!important">
    
<div class="displays allResults new_data">
    <h2>Software subscription history</h2>
    <hr>
    <div class="search">
        <input type="search" id="searchCheckout" placeholder="Enter keyword" onkeyup="searchData(this.value)">
        <a class="download_excel" href="javascript:void(0)" onclick="convertToExcel('data_table', 'subscription report')"title="Download to excel"><i class="fas fa-file-excel"></i></a>
    </div>
    <table id="data_table" class="searchTable">
        <thead>
            <tr style="background:var(--primaryColor)">
                <td>S/N</td>
                <td>Trx. Number</td>
                <td>Package</td>
                <td>Duration</td>
                <td>Amount</td>
                <td>Renewed on</td>
                <td>Due Date</td>
                
            </tr>
        </thead>
        <tbody>
            <?php
                $n = 1;
                $get_users = new selects();
                $details = $get_users->fetch_details_order('renewals', 'renew_date');
                if(gettype($details) === 'array'){
                foreach($details as $detail):
            ?>
            <tr>
                <td style="text-align:center; color:red;"><?php echo $n?></td>
                <td><?php echo $detail->trx_number?></td>
                <td>
                    <?php
                        //get package name
                        $rows = $get_users->fetch_details_group('packages', 'package', 'package_id', $detail->package);
                        echo $rows->package;
                    ?>
                </td>
                <td>
                    <?php
                        //package duration
                        if($detail->duration == "Monthly"){
                            echo "1 Month";
                        }elseif($detail->duration == "Six months"){
                            echo "6 Months";
                        }else{
                            echo "1 Year";
                        }
                    ?>
                </td>
                
                <td><?php echo "₦".number_format($detail->amount, 2)?></td>
                <td style="color:var(--otherColor)"><?php echo date("d-M-Y, h:i:sa", strtotime($detail->renew_date));?></td>
                <td style="color:var(--moreColor)"><?php echo date("d-M-Y", strtotime($detail->new_due_date));?></td>
                
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

<script src="../jquery.js"></script>
<script src="../script.js"></script>