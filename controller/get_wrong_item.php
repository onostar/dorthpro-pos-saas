<?php
    session_start();
    $item = htmlspecialchars(stripslashes($_POST['item_raw']));
    // instantiate class
    include "../classes/dbh.php";
    include "../classes/select.php";

    $get_item = new selects();
    $rows = $get_item->fetch_details_like('items', 'item_name', $item);
     if(gettype($rows) == 'array'){
        foreach($rows as $row):
        
    ?>
    <div class="results">
        <a href="javascript:void(0)" onclick="addWrongItem('<?php echo $row->item_id?>', '<?php echo $row->item_name?>')"><?php echo $row->item_name?></a>
    </div>
   
    
<?php
    endforeach;
     }else{
        echo "No resullt found";
     }
?>