<?php

    if(isset($_GET['expense'])){
        $expense = $_GET['expense'];
        
        // instantiate class
        include "../classes/dbh.php";
        include "../classes/select.php";
        include "../classes/update.php";
        include "../classes/delete.php";

        //delete expense
        $delete_deposit = new deletes();
        $delete_deposit->delete_item('expenses', 'expense_id', $expense);
    ?>
        
<?php
    echo "<div class='success'><p>Expense reversed successfully! <i class='fas fa-thumbs-up'></i></p></div>";
        
    
}