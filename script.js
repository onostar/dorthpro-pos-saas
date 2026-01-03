
//show mobile menu
function displayMenu(){
     let main_menu = document.getElementById("mobile_log");
     if(window.innerWidth <= "800"){
          $("#menu_icon").click(function(){
               if(main_menu.style.display == "block"){
                    $(".main_menu").hide();
                    $("#menu_icon").html("<a href='javascript:void(0)'><i class='fas fa-bars'></i></a>");
               }else{
                    $(".main_menu").show();
                    $("#menu_icon").html("<a href='javascript:void(0)'><i class='fas fa-close'></i></a>");
               }
          })
               
          
     }
     // else{
          /* $("#menu_icon").click(function(){
               if(main_menu.style.display == "block"){
               alert (window.innerWidth);

                    main_menu.style.display == "none"
                    $("#menu_icon").html("<a href='javascript:void(0)'><i class='fas fa-close'></i></a>");
                    document.getElementById("contents").style.width = "100vw";
                    document.getElementById("contents").style.marginLeft = "0";
               }
          })
     } */
}
displayMenu();
//checck the screen width 
function checkMobile(){
     let screen_width = window.innerWidth;
     if(screen_width <= "800"){
          // alert(screen_width);
          $("#contents").click(function(){
               $(".main_menu").hide();
               $("#menu_icon").html("<a href='javascript:void(0)'><i class='fas fa-bars'></i></a>");
          
          })
     }
}
checkMobile();

// toggle password
function togglePassword(){
    let pw = document.querySelectorAll(".password");
    pw.forEach(ps => {
       if(ps.type === "password"){
            ps.type = "text";
            document.querySelector(".icon").innerHTML = "<i class='fas fa-eye-slash'></i>";
            document.querySelector(".icon_txt").innerHTML = "Hide password";
       }else{
            ps.type = "password";
            document.querySelector(".icon").innerHTML = "<i class='fas fa-eye'></i>";
            document.querySelector(".icon_txt").innerHTML = "Show password";
       } 
    });
}

//toggle logout
$(document).ready(function(){
     $("#loginDiv").click(function(){
          $(".login_option").toggle();
     })
})

//toggle menu with more options
$(document).ready(function(){
     $(".addMenu").click(function(){
          $(".nav1Menu").toggle();
          //change icon from plus to miinus and vice versa
          let option_icon = document.querySelector(".options");
          if(document.querySelector(".nav1Menu").style.display == "block"){
               option_icon.innerHTML = "<i style='background:none; color:#fff!important; box-shadow:none!important;' class='fas fa-minus'></i>";
          }else{
               option_icon.innerHTML = "<i style='background:none; color:#fff!important; box-shadow:none!important;' class='fas fa-plus'></i>";
          }

     })
})
//toggle all submenu
/* show frequenty asked questions */
function toggleMenu(subMenu){
     let menus = document.querySelectorAll(".subMenu");
     menu_id = document.getElementById(subMenu);
     if(menu_id.style.display == "block"){
          menu_id.style.display = "none";
     }else{
          menus.forEach(function(menu){
               menu.style.display = "none";
          })
          menu_id.style.display = "block";
     }
}

//show payment mode forms
function showCash(){
     document.querySelectorAll(".payment_form").forEach(function(forms){
          forms.style.display = "none";
     })
     $("#cash").show();
}
function showPos(){
     document.querySelectorAll(".payment_form").forEach(function(forms){
          forms.style.display = "none";
     })
     $("#pos").show();
}
function showTransfer(){
     document.querySelectorAll(".payment_form").forEach(function(forms){
          forms.style.display = "none";
     })
     $("#transfer").show();
}
//show pages dynamically with xhttp request
function showPage(page){
     let xhr = false;
     if(window.XMLHttpRequest){
          xhr = new XMLHttpRequest();
     }else{
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
     }
     if(xhr){
          $(".contents").html("<div class='processing'><div class='loader'></div></div>");
          xhr.onreadystatechange = function(){
               if(xhr.readyState == 4 && xhr.status == 200){
                    document.querySelector(".contents").innerHTML = xhr.responseText;
               }
          }
          xhr.open("GET", page, true );
          xhr.send(null);
     }
}

//add users
function addUser(){
     let username = document.getElementById("username").value;
     let full_name = document.getElementById("full_name").value;
     let user_role = document.getElementById("user_role").value;
     let store_id = document.getElementById("store_id").value;
     // alert(store);
     if(full_name.length == 0 || full_name.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter user full name!");
          $("#full_name").focus();
          return;
     }else if(username.length == 0 || username.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter a username!");
          $("#username").focus();
          return;
     }else if(user_role.length == 0 || user_role.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select user role!");
          $("#user_role").focus();
          return;
     }else if(store_id.length == 0 || store_id.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select store!");
          $("#store").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_users.php",
               data : {username:username, full_name:full_name, user_role:user_role, store_id:store_id},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#username").val('');
     $("#full_name").val('');
     $("#user_role").val('');
     $("#store_id").val('');
     $("#full_name").focus();
     return false;
}

//add departments
function addDepartment(){
     let department = document.getElementById("department").value;
     if(department.length == 0 || department.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input department!");
          $("#department").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_department.php",
               data : {department:department},
               beforeSend :function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#department").val('');
     $("#department").focus();
     return false;
}
//add expense head
function addExpHead(){
     let exp_head = document.getElementById("exp_head").value;
     if(exp_head.length == 0 || exp_head.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input expense head!");
          $("#exp_head").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_exp_head.php",
               data : {exp_head:exp_head},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#exp_head").val('');
     $("#exp_head").focus();
     return false;
}
//add categories
function addCategory(){
     let category = document.getElementById("category").value;
     let department = document.getElementById("department").value;
     if(category.length == 0 || category.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter category!");
          $("#category").focus();
          return;
     }else if(department.length == 0 || department.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a department!");
          $("#department").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_category.php",
               data : {category:category, department:department},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".info").html(response);
               }
          })
     }
     $("#category").val('');
     $("#category").focus();
     return false;
}
//add bank
function addBank(){
     let bank = document.getElementById("bank").value;
     let account_num = document.getElementById("account_num").value;
     if(bank.length == 0 || bank.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input bank name!");
          $("#bank").focus();
          return;
     }else if(account_num.length == 0 || account_num.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input account number!");
          $("#account_num").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_bank.php",
               data : {bank:bank, account_num:account_num},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#bank").val('');
     $("#account_num").val('');
     $("#bank").focus();
     return false;
}
//search for data within table
/* function searchData(data){
     let $row = $(".searchTable tbody tr");
     let val = $.trim(data).replace(/ +/g, ' ').toLowerCase();
     $row.show().filter(function(){
          var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
          return !~text.indexOf(val);
     }).hide();
} */

// disale user
function disableUser(user_id){
     let disable = confirm("Do you want to disable this user?", "");
     if(disable){
          // alert(user_id);
          $.ajax({
               type: "GET",
               url : "../controller/disable_user.php?id="+user_id,
               beforeSend: function(){
                   $("#disable_user").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#disable_user").html(response);
               }
          })
          setTimeout(function(){
               $('#disable_user').load("disable_user.php #disable_user");
          }, 3000);
          return false;
     }
}

// activate disabled user
function activateUser(user_id){
     let activate = confirm("Do you want to activate this user account?", "");
     if(activate){
          $.ajax({
               type : "GET",
               url : "../controller/activate_user.php?user_id="+user_id,
               beforeSend: function(){
                   $("#activate_user").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#activate_user").html(response);
               }
          })
          setTimeout(function(){
               $("#activate_user").load("activate_user.php #activate_user");
          }, 3000);
          return false;
     }
}
// Reset user password
function resetPassword(user_id){
     let reset = confirm("Do you want to reset this user password?", "");
     if(reset){
          $.ajax({
               type : "GET",
               url : "../controller/reset_user_password.php?user_id="+user_id,
               beforeSend: function(){
                   $("#reset_password").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#reset_password").html(response);
               }
          })
          setTimeout(function(){
               $("#reset_password").load("reset_password.php #reset_password");
          }, 3000);
          return false;
     }
}

// add items with quantity for the very first time of opening
function addItem(){
     let department = document.getElementById("department").value;
     let item_category = document.getElementById("item_category").value;
     let item = document.getElementById("item").value;
     let barcode = document.getElementById("barcode").value;
     let cost = document.getElementById("cost").value;
     let vendor = document.getElementById("vendor").value;
     let invoice = document.getElementById("invoice").value;
     let sales_price = document.getElementById("sales_price").value;
     let reorder = document.getElementById("reorder").value;
     let quantity = document.getElementById("quantity").value;
     let expiration_date = document.getElementById("expiration_date").value;
     let todayDate = new Date();
     if(item_category.length == 0 || item_category.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select item category!");
          $("#item_category").focus();
          return;
     }else if(item.length == 0 || item.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter item name");
          $("#item").focus();
          return;
     }else if(expiration_date.length == 0 || expiration_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input expiration date");
          $("#expiration_date").focus();
          return;
     }else if(vendor.length == 0 || vendor.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select vendor");
          $("#vendor").focus();
     }else if(invoice.length == 0 || invoice.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please invoice number");
          $("#invoice").focus();
          return;
     }else if(todayDate >= new Date(expiration_date)){
          alert("You can not stock in expired items!");
          $("#expiration_date").focus();
          return;
     }else if(parseFloat(cost) < 0 || parseFloat(sales_price) < 0){
          alert("Cost or sales price cannot be less than 0");
          $("#sales_price").focus();
          return;
     }else if(parseFloat(cost) > parseFloat(sales_price)){
          alert("Cost price cannot be greater than selling price");
          $("#sales_price").focus();
          return;
     }else if(parseFloat(quantity) < 0){
          alert("Quantity must not be less than 0");
          $("#quantity").focus();
          return;
     /* }else if(barcode.length == 0 || barcode.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter item barcode");
          $("#barcode").focus();
          return; */
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_item.php",
               data : {department:department, item_category:item_category, item:item, barcode:barcode, cost:cost, sales_price:sales_price, reorder:reorder, quantity:quantity, expiration_date:expiration_date, invoice:invoice, vendor:vendor},
               beforeSend: function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#room_category").val('');
     $("#item").val('');
     $("#barcode").val('');
     $("#cost").val('');
     $("#sales_price").val('');
     $("#expiration_date").val('');
     $("#reorder").val('10');
     $("#quantity").val('0');
     $("#item").focus();
     return false;    
}
// add items after opening
function addNewItem(){
     let department = document.getElementById("department").value;
     let item_category = document.getElementById("item_category").value;
     let item = document.getElementById("item").value;
     let barcode = document.getElementById("barcode").value;
     if(item_category.length == 0 || item_category.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select item category!");
          $("#item_category").focus();
          return;
     }else if(item.length == 0 || item.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter item name");
          $("#item").focus();
          return;
     /* }else if(barcode.length == 0 || barcode.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter item barcode");
          $("#barcode").focus();
          return; */
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_new_item.php",
               data : {department:department, item_category:item_category, item:item, barcode:barcode},
               beforeSend: function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#room_category").val('');
     $("#item").val('');
     $("#barcode").val('');
     $("#item").focus();
     return false;    
}
// add stores
function addStore(){
     let store_name = document.getElementById("store_name").value;
     let store_address = document.getElementById("store_address").value;
     let phone = document.getElementById("phone").value;
     if(store_name.length == 0 || store_name.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter store name!");
          $("#store_name").focus();
          return;
     }else if(store_address.length == 0 || store_address.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter store address");
          $("#store_address").focus();
          return;
     }else if(phone.length == 0 || phone.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter store phone numbers");
          $("#phone").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_store.php",
               data : {store_name:store_name, store_address:store_address, phone:phone},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#room_category").val('');
     $("#store_name").val('');
     $("#store_address").val('');
     $("#phone").val('');
     $("#store").focus();
     return false;    
}
// add staffs 
function addStaff(){
     let staff_name = document.getElementById("staff_name").value;
     let phone_number = document.getElementById("phone_number").value;
     let home_address = document.getElementById("home_address").value;
     if(staff_name.length == 0 || staff_name.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input staff name!");
          $("#staff_name").focus();
          return;
     }else if(home_address.length == 0 || home_address.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input staff residential address");
          $("#home_address").focus();
          return;
     }else if(phone_number.length == 0 || phone_number.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input staff phone number");
          $("#phone_number").focus();
          return;
     }else if(phone_number.length < 11){
          alert("Phone number is too short");
          $("#phone_number").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_staff.php",
               data : {staff_name:staff_name, phone_number:phone_number, home_address:home_address},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#room_category").val('');
     $("#staff_name").val('');
     $("#phone_number").val('');
     $("#home_address").val('');
     $("#staff_name").focus();
     return false;    
}
// add suppliers 
function addSupplier(){
     let supplier = document.getElementById("supplier").value;
     let contact_person = document.getElementById("contact_person").value;
     let phone = document.getElementById("phone").value;
     let email = document.getElementById("email").value;
     if(supplier.length == 0 || supplier.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input supplier name!");
          $("#supplier").focus();
          return;
    /*  }else if(contact_person.length == 0 || contact_person.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input contact person name");
          $("#contact_person").focus();
          return;
     }else if(phone.length == 0 || phone.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input phone number");
          $("#phone").focus();
          return;
     }else if(email.length == 0 || email.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input email address");
          $("#email").focus();
          return; */
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_vendor.php",
               data : {supplier:supplier, contact_person:contact_person, phone:phone, email:email},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#supplier").val('');
     $("#contact_person").val('');
     $("#phone").val('');
     $("#email").val('');
     $("#supplier").focus();
     return false;    
}

// get item categories
function getCategory(post_department){
     let department = post_department;
     if(department){
          $.ajax({
               type : "POST",
               url :"../controller/get_categories.php",
               data : {department:department},
               success : function(response){
                    $("#item_category").html(response);
               }
          })
          return false;
     }else{
          $("#item_category").html("<option value'' selected>Select department first</option>")
     }
     
}

//display any item form
function getForm(item, link){
     // alert(item_id);
     $.ajax({
          type : "GET",
          url : "../controller/"+link+"?item_id="+item,
          beforeSend : function(){
               $(".info").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".info").html(response);
               window.scrollTo(0, 0);
          }
     })
     return false;
 
 }


//display stockin form
function displayStockinForm(item_id){
     // alert(item_id);
/*      let invoice = document.getElementById("invoice").value;
     let vendor = document.getElementById("vendor").value; */
     let item = item_id;
          
          $.ajax({
               type : "GET",
               url : "../controller/get_stockin_details.php?item="+item,
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".info").html(response);
                    document.getElementById("info").scrollIntoView();
               }
          })
          $("#sales_item").html("");
          $("#item").val('');
          $("#quantity").focus();

          return false;
     // }
     
 }
//display stockin form for warehouse goods
function displayWarehouseForm(item_id){
     let item = item_id;
          
          $.ajax({
               type : "GET",
               url : "../controller/get_warehouse_details.php?item="+item,
               success : function(response){
                    $(".info").html(response);
               }
          })
          $("#sales_item").html("");
          $("#item").val('');

          return false;
     // }
     
 }
//display transfer item form
function addTransfer(item_id){
     let item = item_id;
     let invoice = document.getElementById("invoice").value;
     let store_to = document.getElementById("store_to").value;
          $.ajax({
               type : "POST",
               url : "../controller/get_transfer_details.php",
               data : {item_to:item, invoice:invoice, store_to:store_to},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".info").html(response);
               }
          })
          $("#sales_item").html("");
          return false;
     // }
     
 }
//display transfer item batch
 function viewBatch(item_id){
      let item = item_id;
           
           $.ajax({
                type : "GET",
                url : "../controller/get_batch_details.php?item="+item,
                beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
                success : function(response){
                     $(".info").html(response);
                }
           })
           $("#sales_item").html("");
           $("#item").val('');
           return false;
      // }
      
  }
 //display item purchase history
function checkStockinHistory(item_id){
     // alert(item_id);
/*      let invoice = document.getElementById("invoice").value;
     let vendor = document.getElementById("vendor").value; */
     let item = item_id;
          
          $.ajax({
               type : "GET",
               url : "../controller/stockin_history.php?item="+item,
               beforeSend : function(){
                    $(".new_data").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".new_data").html(response);
               }
          })
          $("#sales_item").html("");
          $("#item").val('');
          return false;
     // }
     
 }
 //display customer statement/transaction history
function getCustomerStatement(customer_id){
     let customer = customer_id;
          
          $.ajax({
               type : "GET",
               url : "../controller/customer_statement.php?customer="+customer,
               beforeSend : function(){
                    $(".new_data").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".new_data").html(response);
               }
          })
          $("#sales_item").html("");
          $("#customer").val("");
          return false;
     // }
     
 }
 //display items in each customer inivoice under statement/transaction history
function viewCustomerInvoice(invoice_id){
     let invoice = invoice_id;
          
          $.ajax({
               type : "GET",
               url : "../controller/customer_invoices.php?invoice="+invoice,
               beforeSend : function(){
                    $("#customer_invoices").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#customer_invoices").html(response);
                    // window.scrollTo(0, 0);
                    document.getElementById("customer_invoices").scrollIntoView();
               }
          })
          $("#sales_item").html("");
          return false;
     // }
     
 }
 //display payment form for credit payments
function addPayment(invoice_id){
     let invoice = invoice_id;          
          $.ajax({
               type : "GET",
               url : "../controller/get_payment.php?invoice="+invoice,
               beforeSend : function(){
                    $("#customer_invoices").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#customer_invoices").html(response);
                    // window.scrollTo(0, 0);
                    document.getElementById("customer_invoices").scrollIntoView();
               }
          })
          // $("#sales_item").html("");
          return false;
     // }
     
 }
 //stockin in items
function stockin(){
     let posted_by = document.getElementById("posted_by").value;
     let store = document.getElementById("store").value;
     let invoice_number = document.getElementById("invoice_number").value;
     let supplier = document.getElementById("supplier").value;
     let item_id = document.getElementById("item_id").value;
     let quantity = document.getElementById("quantity").value;
     let cost_price = document.getElementById("cost_price").value;
     let sales_price = document.getElementById("sales_price").value;
     let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
    /*let wholesale_price = document.getElementById("wholesale_price").value;
     let wholesale_pack = document.getElementById("wholesale_pack").value; */
     let expiration_date = document.getElementById("expiration_date").value;
     let todayDate = new Date();
     // let today = todayDate.toLocaleDateString();
     // alert(today);
     if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity purchased!");
          $("#quantity").focus();
          return;
     }else if(parseFloat(quantity) <= 0){
          alert("Please input quantity purchased!");
          $("#quantity").focus();
          return;
     }else if(cost_price.length == 0 || cost_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input cost price");
          $("#cost_price").focus();
          return;
     }else if(sales_price.length == 0 || sales_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input selling price");
          $("#sales_price").focus();
          return;
     }else if(expiration_date.length == 0 || expiration_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item expiration date");
          $("#expiration_date").focus();
          return;
     }else if(todayDate >= new Date(expiration_date)){
          alert("You can not stock in expired items!");
          $("#expiration_date").focus();
          return;
     }else if(parseInt(cost_price) > parseInt(sales_price)){
          alert("Cost price cannot be greater than selling price!");
          $("#sales_price").focus();
          return;
     /*}else if(parseInt(cost_price) >= parseInt(wholesale_price)){
          alert("Cost price cannot be greater than wholesale price!");
          $("#wholesale_price").focus();
          return;
     }else if(parseInt(cost_price) < 0 || parseInt(sales_price) <= 0 || parseInt(wholesale_price) < 0 || parseInt(wholesale_pack) < 0 | parseInt(pack_price) < 0){
          alert("Value cannot be 0 or less than 0!");
          $("#sales_price").focus();
          return;*/
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/stock_in.php",
               data : {posted_by:posted_by, store:store, supplier:supplier, invoice_number:invoice_number, item_id:item_id, quantity:quantity, cost_price:cost_price, sales_price:sales_price, pack_price:pack_price,  pack_size:pack_size, /*wholesale_price:wholesale_price, wholesale_pack:wholesale_pack, */  expiration_date:expiration_date},
              beforeSend : function(){
                    $(".stocked_in").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".stocked_in").html(response);
               }
          })
          /* $("#quantity").val('');
          $("#expiration_date").val('');*/
          $("#item").focus();
          $(".info").html('');
          return false; 
     }
}
 //stockin in items for warehouse
function stockinWarehouse(){
     let posted_by = document.getElementById("posted_by").value;
     let store = document.getElementById("store").value;
     let invoice_number = document.getElementById("invoice_number").value;
     let supplier = document.getElementById("supplier").value;
     let item_id = document.getElementById("item_id").value;
     let quantity = document.getElementById("quantity").value;
     let cost_price = document.getElementById("cost_price").value;
     let pack_size = document.getElementById("pack_size").value;
     let expiration_date = document.getElementById("expiration_date").value;
     let todayDate = new Date();
     let today = todayDate.toLocaleDateString();
     // alert(today);
     if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity purchased!");
          $("#quantity").focus();
          return;
     }else if(quantity <= 0){
          alert("Please input quantity purchased!");
          $("#quantity").focus();
          return;
     }else if(cost_price.length == 0 || cost_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input cost price");
          $("#cost_price").focus();
          return;
     }else if(expiration_date.length == 0 || expiration_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item expiration date");
          $("#expiration_date").focus();
          return;
     }else if(new Date(today).getTime() > new Date(expiration_date).getTime()){
          alert("You can not stock in expired items!");
          $("#expiration_date").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/stock_inwarehouse.php",
               data : {posted_by:posted_by, store:store, supplier:supplier, invoice_number:invoice_number, item_id:item_id, quantity:quantity, cost_price:cost_price, pack_size:pack_size, expiration_date:expiration_date},
               success : function(response){
               $(".stocked_in").html(response);
               }
          })
          /* $("#quantity").val('');
          $("#expiration_date").val('');
          $("#quantity").focus(); */
          $(".info").html('');
          return false; 
     }
}
 //transfer in items
function transfer(){
     let posted_by = document.getElementById("posted_by").value;
     let store_from = document.getElementById("store_from").value;
     let store_to = document.getElementById("store_to").value;
     let invoice = document.getElementById("invoice").value;
     let item_id = document.getElementById("item_id").value;
     let quantity = document.getElementById("quantity").value;
     let expiration = document.getElementById("expiration").value;
     if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#quantity").focus();
          return;
     }else if(quantity <= 0){
          alert("Please input quantity!");
          $("#quantity").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/transfer.php",
               data : {posted_by:posted_by, store_to:store_to, store_from:store_from, invoice:invoice, item_id:item_id, quantity:quantity, expiration:expiration},
               beforeSend : function(){
                    $(".stocked_in").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".stocked_in").html(response);
               }
          })
          /* $("#quantity").val('');
          $("#expiration_date").val('');
          $("#quantity").focus(); */
          $(".info").html('');
          return false; 
     }
}

//delete individual purchases
function deletePurchase(purchase, item){
     let confirmDel = confirm("Are you sure you want to delete this purchase?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_purchase.php?purchase_id="+purchase+"&item_id="+item,
               beforeSend : function(){
                    $(".stocked_in").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".stocked_in").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}
//close stock in form
function closeStockin(url){
     $("#stockin").load(url+" #stockin");
}


 //adjust item quantity
 function adjustQty(){
     let item_id = document.getElementById("item_id").value;
     let quantity = document.getElementById("quantity").value;
     let expiration = document.getElementById("expiration").value;
     let todayDate = new Date();
     // let today = todayDate.toLocaleDateString();
     if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#quantity").focus();
          return;
     }else if(expiration.length == 0 || expiration.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item expiration date!");
          $("#expiration").focus();
          return;
     }else if(todayDate >= new Date(expiration)){
          alert("You can not stock in expired items!");
          $("#expiration").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/stock_adjustment.php",
               data: {item_id:item_id, quantity:quantity, expiration:expiration},
               beforeSend : function(){
                    $("#adjust_quantity").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#adjust_quantity").html(response);
               }
          })
          setTimeout(function(){
               $("#adjust_quantity").load("stock_adjustment.php #adjust_quantity");
          }, 2000);
          return false
     }
 }
 
 //remove item quantity from store
 function removeQty(){
     let item_id = document.getElementById("item_id").value;
     let quantity = document.getElementById("quantity").value;
     let remove_reason = document.getElementById("remove_reason").value;
     if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#quantity").focus();
          return;
     }else if(quantity <= 0){
          alert("Please input quantity to remove!");
          $("#quantity").focus();
          return;
     }else if(remove_reason.length == 0 || remove_reason.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select reason for removal!");
          $("#remove_reason").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/remove_item.php",
               data: {item_id:item_id, quantity:quantity, remove_reason:remove_reason},
               beforeSend : function(){
                    $("#remove_item").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#remove_item").html(response);
               }
          })
          setTimeout(function(){
               $("#remove_item").load("remove_item.php #remove_item");
          }, 2000);
          return false
     }
 }
 //adjust item expiration 
 function adjustExpiry(){
     let item_id = document.getElementById("item_id").value;
     let exp_date = document.getElementById("exp_date").value;
     let todayDate = new Date();
     // let today = todayDate.toLocaleDateString();
     if(exp_date.length == 0 || exp_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input date!");
          $("#exp_date").focus();
          return;
     }else if(todayDate >= new Date(exp_date)){
          alert("Expiration date is invalid!");
          $("#exp_date").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/adjust_expiration.php",
               data: {item_id:item_id, exp_date:exp_date},
               beforeSend : function(){
                    $("#adjust_expiration").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#adjust_expiration").html(response);
               }
          })
          setTimeout(function(){
               $("#adjust_expiration").load("adjust_expiration.php #adjust_expiration");
          }, 2000);
          return false
     }
 }

 
 //close price form
 function closeForm(){
     
         $(".priceForm").hide();
     
 }

 
 //change other item price
 function changeItemPrice(){
     let item_id = document.getElementById("item_id").value;
     let cost_price = document.getElementById("cost_price").value;
     let sales_price = document.getElementById("sales_price").value;
     let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
     let discount = document.getElementById("discount").value;
    /*let wholesale_price = document.getElementById("wholesale_price").value;
     let wholesale_pack = document.getElementById("wholesale_pack").value; */
     /* let carton_role = document.getElementById("carton_role").value;
     let carton_size = document.getElementById("carton_size").value; */
     if(parseFloat(cost_price) >= parseFloat(sales_price)){
          alert("Selling price can not be lesser than cost price!");
          $("#sales_price").focus();
          return;
     /* }else if(parseInt(cost_price) >= parseInt(wholesale_price)){
          alert("Wholesale price can not be lesser than cost price!");
          $("#wholesale_price").focus();
          return; */
     }else if(cost_price.length == 0 || cost_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter cost price!");
          $("#cost_price").focus();
          return;
     }else if(sales_price.length == 0 || sales_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter selling price!");
          $("#sales_price").focus();
          return;
     /* }else if(wholesale_price.length == 0 || wholesale_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter wholesale price!");
          $("#wholesale_price").focus();
          return; */
     /*}else if(pack_price.length == 0 || pack_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter pack price!");
          $("#pack_price").focus();
          return;
     }else if(pack_price <= cost_price){
          alert("Error! Pack price cannot be lesser than cost price!");
          $("#pack_price").focus();
          return;
     }else if(pack_size.length == 0 || pack_size.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter pack size!");
          $("#pack_size").focus();
          return; */
     }else if(sales_price <= 0 || cost_price < 0 || parseFloat(discount) < 0){
          alert("Values cannot be less than 0!");
          $("#sales_price").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/edit_price.php",
               data: {item_id:item_id, cost_price:cost_price, sales_price:sales_price, pack_price:pack_price, pack_size:pack_size,discount:discount/*wholesale_price:wholesale_price, wholesale_pack:wholesale_pack, carton_role:carton_role,carton_size:carton_size */},
               beforeSend : function(){
                    $("#edit_item_price").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#edit_item_price").html(response);
               }
          })
          setTimeout(function(){
               $("#edit_item_price").load("item_price.php #edit_item_price");
          }, 1000);
          return false
     }
 }
 //change percentage markup
 function changeMarkup(){
     let item_id = document.getElementById("item_id").value;
     let cost_price = document.getElementById("cost_price").value;
     let markup = document.getElementById("markup").value;
    /*  let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
     let wholesale_price = document.getElementById("wholesale_price").value;
     let wholesale_pack = document.getElementById("wholesale_pack").value;*/
     
    /*  if(parseInt(cost_price) >= parseInt(sales_price)){
          alert("Selling price can not be lesser than cost price!");
          $("#sales_price").focus();
          return; */
     /* }else if(parseInt(cost_price) >= parseInt(wholesale_price)){
          alert("Wholesale price can not be lesser than cost price!");
          $("#wholesale_price").focus();
          return; */
     if(cost_price.length == 0 || cost_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter cost price!");
          $("#cost_price").focus();
          return;
     }else if(markup.length == 0 || markup.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter percentage markup!");
          $("#markup").focus();
          return;
     /* }else if(sales_price.length == 0 || sales_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter selling price!");
          $("#sales_price").focus();
          return; */
     /* }else if(wholesale_price.length == 0 || wholesale_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter wholesale price!");
          $("#wholesale_price").focus();
          return; */
     /* }else if(pack_price.length == 0 || pack_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter pack price!");
          $("#pack_price").focus();
          return;
     }else if(pack_price <= cost_price){
          alert("Error! Pack price cannot be lesser than cost price!");
          $("#pack_price").focus();
          return;*/
    
     }else if(markup <= 0 || cost_price <= 0 /* || carton_size < 0 || carton_role < 0 */){
          alert("Values cannot be less than 0!");
          $("#cost_price").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/edit_markup.php",
               data: {item_id:item_id, cost_price:cost_price, /* sales_price:sales_price, pack_price:pack_price, wholesale_price:wholesale_price, wholesale_pack:wholesale_pack, pack_size:pack_size, */markup:markup},
               beforeSend : function(){
                    $("#edit_item_price").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#edit_item_price").html(response);
               }
          })
          setTimeout(function(){
               $("#edit_item_price").load("manage_markup.php #edit_item_price");
          }, 1000);
          return false
     }
 }
 //modify item name
 function modifyItem(){
     let item_id = document.getElementById("item_id").value;
     let item_name = document.getElementById("item_name").value;
     if(item_name.length == 0 || item_name.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item name!");
          $("#item_name").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/modify_item.php",
               data: {item_id:item_id, item_name:item_name},
               beforeSend : function(){
                    $("#edit_item_name").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#edit_item_name").html(response);
               }
          })
          setTimeout(function(){
               $("#edit_item_name").load("modify_item.php #edit_item_name");
          }, 1500);
          return false
     }
 }
 //update item barcode
 function updateBarcode(){
     let item_id = document.getElementById("item_id").value;
     let barcode = document.getElementById("barcode").value;
     if(barcode.length == 0 || barcode.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item barcode!");
          $("#barcode").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/update_barcode.php",
               data: {item_id:item_id, barcode:barcode},
               beforeSend : function(){
                    $("#update_barcode").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#update_barcode").html(response);
               }
          })
          setTimeout(function(){
               $("#update_barcode").load("update_barcode.php #update_barcode");
          }, 1500);
          return false
     }
 }
 //change item category
 function changeCategory(){
     let item_id = document.getElementById("item_id").value;
     let department = document.getElementById("department").value;
     let item_category = document.getElementById("item_category").value;
     if(department.length == 0 || department.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select item category!");
          $("#department").focus();
          return;
     }else if(item_category.length == 0 || item_category.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select item subcategory!");
          $("#item_category").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/change_category.php",
               data: {item_id:item_id, department:department, item_category:item_category},
               beforeSend : function(){
                    $("#change_category").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#change_category").html(response);
               }
          })
          setTimeout(function(){
               $("#change_category").load("change_category.php #change_category");
          }, 1500);
          return false
     }
 }

// update password
function updatePassword(){
     let username = document.getElementById('username').value;
     let current_password = document.getElementById('current_password').value;
     let new_password = document.getElementById('new_password').value;
     let retype_password = document.getElementById('retype_password').value;
     /* authentication */
     if(current_password == 0 || current_password.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter current password");
          $("#current_password").focus();
          return;
     }else if(new_password == 0 || new_password.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter new password");
          $("#new_password").focus();
          return;
     }else if(new_password.length < 6){
          alert("New password must be greater or equal to 6 characters");
          $("#new_password").focus();
          return;
     }else if(retype_password == 0 || retype_password.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please retype new password");
          $("#retype_password").focus();
          return;
     }else if(new_password !== retype_password){
          alert("Passwords does not match!");
          $("#retype_password").focus();
          return;
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_password.php",
               data: {username:username, current_password:current_password, new_password:new_password, retype_password:retype_password},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".info").html(response);
               }
          });
     }
     return false;
}
// update username
function updateUsername(){
     let username = document.getElementById('username').value;
     let user_id = document.getElementById('user_id').value;
     let password = document.getElementById('password').value;
    
     /* authentication */
     if(password == 0 || password.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter password");
          $("#password").focus();
          return;
     }else if(username == 0 || username.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter username");
          $("#username").focus();
          return;
     }else if(password.length < 6){
          alert("Password must be greater or equal to 6 characters");
          $("#password").focus();
          return;
     
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_username.php",
               data: {username:username, password:password, user_id:user_id},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".info").html(response);
               }
          });
     }
     return false;
}

//get vendors
function getVendors(vendor){
     let ven_input = vendor;
     if(ven_input){
          $.ajax({
               type : "POST",
               url :"../controller/get_vendors.php",
               data : {ven_input:ven_input},
               beforeSend : function(){
                    $("#vendors").html("<p>Searching...</p>")
               },
               success : function(response){
                    $("#vendors").html(response);
               }
          })
          return false;
     }else{
          $("#vendors").html("<option value='' selected>No result</option>")
     }
     
}

// Detect input changes for both barcode and item name for sales
// Detect input changes for both barcode and item name for sales
const MIN_BARCODE_LENGTH = 6;
const MIN_ITEM_NAME_LENGTH = 3;
const DEBOUNCE_DELAY = 300;

let typingTimeout;
let lastInput = "";
let barcodeSearchInProgress = false;
let currentRequest = null; // To track active AJAX request

function checkItems(input) {
    input = input.trim();
    if (input === lastInput) return;
    lastInput = input;

    clearTimeout(typingTimeout);

    if (input.length >= MIN_BARCODE_LENGTH && /^\d+$/.test(input)) {
        barcodeSearchInProgress = true;
        sendRequest(input, 'barcode');

        setTimeout(() => {
            barcodeSearchInProgress = false;
        }, 700);
    } 
    else if (input.length >= MIN_ITEM_NAME_LENGTH && !barcodeSearchInProgress) {
        typingTimeout = setTimeout(() => {
            sendRequest(input, 'item_name');
        }, DEBOUNCE_DELAY);
    }
}

/* function sendRequest(input, type) {
    // Cancel previous AJAX request if still ongoing
    if (currentRequest && currentRequest.readyState !== 4) {
        currentRequest.abort();
    }

    currentRequest = $.ajax({
        type: "POST",
        url: "../controller/get_items.php",
        data: { item: input, type: type },
        success: function(response) {
            try {
                const data = JSON.parse(response);
                if (data.error) {
                    $("#sales_item").html(`<p>${data.error}</p>`);
                } else {
                    const items = data.map(item => `
                        <div class="results">
                            <a href="javascript:void(0)" onclick="addSales('${item.item_id}')">
                                ${item.item_name} (Price => ₦${item.sales_price}, Qty => ${item.quantity})
                            </a>
                        </div>
                    `).join("");
                    $("#sales_item").html(items);
                }
            } catch (e) {
                console.error("Parse error:", e);
                $("#sales_item").html("<p>Server returned invalid data.</p>");
            }
        },
        error: function(xhr, status, error) {
            if (status !== "abort") {
                console.error("Fetch error:", status, error);
                $("#sales_item").html("<p>Failed to fetch item. Please try again.</p>");
            }
        }
    });
}  */
//auto add item if barcode is found
function sendRequest(input, type) {
    if (currentRequest && currentRequest.readyState !== 4) {
        currentRequest.abort();
    }

    currentRequest = $.ajax({
        type: "POST",
        url: "../controller/get_items.php",
        data: { item: input, type: type },
          beforeSend: function() {
               $("#sales_item").html("<p>Searching...</p>");
          },
        success: function(response) {
            try {
                const data = JSON.parse(response);

                if (data.error) {
                    $("#sales_item").html(`<p>${data.error}</p>`);
                } else {
                    if (type === "barcode" && data.length === 1) {
                        // Auto-add the single item
                        addSales(data[0].item_id);

                        // Optionally clear the input after adding
                        $("#item").val("");
                        $("#sales_item").html(""); // Clear results
                    } else {
                        // Show results to choose manually
                        const items = data.map(item => `
                            <div class="results">
                                <a href="javascript:void(0)" onclick="addSales('${item.item_id}')">
                                    ${item.item_name} (Price => ₦${item.sales_price}, Qty=> ${item.quantity})
                                </a>
                            </div>
                        `).join("");
                        $("#sales_item").html(items);
                    }
                }
            } catch (e) {
                console.error("Parse error:", e);
                $("#sales_item").html("<p>Server returned invalid data.</p>");
            }
        },
        error: function(xhr, status, error) {
            if (status !== "abort") {
                console.error("Fetch error:", status, error);
                $("#sales_item").html("<p>Failed to fetch item. Please try again.</p>");
            }
        }
    });
}
     /* function getItems(input, type) {
         $.ajax({
             type: "POST",
             url: "../controller/get_items.php",
             data: { item: input, type: type },
             success: function(response) {
                 try {
                     const data = JSON.parse(response);
                     if (data.error) {
                         $("#sales_item").html(`<p>${data.error}</p>`);
                     } else {
                         const items = data.map(item => `
                             <div class="results">
                                 <a href="javascript:void(0)" onclick="addSales('${item.item_id}')">
                                     ${item.item_name} (Price => ₦${item.sales_price}, Qty => ${item.quantity})
                                 </a>
                             </div>
                         `).join("");
                         $("#sales_item").html(items);
                     }
                 } catch (e) {
                     console.error("Error parsing response:", e);
                     $("#sales_item").html("<p>Invalid response from server</p>");
                 }
             },
             error: function(xhr, status, error) {
                 console.error("Error fetching item:", status, error);
                 $("#sales_item").html("<p>Error fetching item. Please try again.</p>");
             }
         });
     } */

/* function checkItems(input, checkfunction){
     let typingTimeout;
     // Clear any existing timeout to debounce
     clearTimeout(typingTimeout);
 
     // Set a timeout to trigger fetchItems after 300ms of inactivity
     typingTimeout = setTimeout(function() {
         if (input.length >= 3) { // Adjust this as needed for item names
             checkfunction(input);
         }
     }, 300); // Adjust delay time based on scanning speed
}; */
// Detect input changes for both barcode and item name for other menus
function checkOtherItems(input, usefunction, url){
     let typingTimeout;
     // Clear any existing timeout to debounce
     clearTimeout(typingTimeout);
 
     // Set a timeout to trigger fetchItems after 300ms of inactivity
     typingTimeout = setTimeout(function() {
         if (input.length >= 3) { // Adjust this as needed for item names
             usefunction(input, url);
         }
     }, 300); // Adjust delay time based on scanning speed
};

//get item name for direct sales
/* function getItems(item){
     $.ajax({
          type : "POST",
          url :"../controller/get_items.php",
          data : {item:item},
          success : function(response){
               $("#sales_item").html(response);
          },
          error: function(xhr, status, error) {
               console.error("Error fetching item:", status, error);
               $("#sales_item").html("<p>Error fetching item. Please try again.</p>");
          }
     })
     return false;
} */

//get item for sales order
function getItemsOrder(item_name){
     let item = item_name;
     // alert(check_room);
    
     $.ajax({
          type : "POST",
          url :"../controller/get_sales_order_items.php",
          data : {item:item},
          beforeSend : function(){
               $("#sales_item").html("<p>Searching...</p>");
          },
          success : function(response){
               $("#sales_item").html(response);
          }
     })
     return false;
     
}
//get item for wholesale direct sales
function getWholesaleItems(item_name){
     let item = item_name;
     let customer = document.getElementById("customer").value;
     // alert(check_room);
     // return;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_wholesale_items.php",
                    data : {item:item, customer:customer},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}
//get item for stockin
function getItemStockin(item_name, url){
     let item = item_name;
     // alert(check_room);
     // return;
     let invoice = document.getElementById("invoice").value;
     let vendor = document.getElementById("vendor").value;
     if(invoice.length == 0 || invoice.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input invoice number!");
          $("#invoice").focus();
          return;
     }else if(vendor.length == 0 || vendor.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select supplier!");
          $("#vendor").focus();
          return;
     }else{
          if(item.length >= 3){
               if(item){
                    $.ajax({
                         type : "POST",
                         url :"../controller/"+url,
                         data : {item:item, invoice:invoice, vendor:vendor},
                         beforeSend : function(){
                              $("#sales_item").html("<p>Searching...</p>");
                         },
                         success : function(response){
                              $("#sales_item").html(response);
                         }
                    })
                    $("#invoice").attr("readonly", true);
                    $("#vendor").attr("readonly", true);
                    return false;
               }else{
                    $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
               }
          }
     }
     
}
// new way to get item for stockin
let stockinTypingTimeout;
let stockinLastInput = "";
let stockinBarcodeSearchInProgress = false;
let stockinCurrentRequest = null;

function checkStockinItems(input) {
    input = input.trim();
    if (input === stockinLastInput) return;
    stockinLastInput = input;

    clearTimeout(stockinTypingTimeout);

    let invoice = document.getElementById("invoice").value;
    let vendor = document.getElementById("vendor").value;

    if (invoice.trim() === "") {
        alert("Please input invoice number!");
        $("#invoice").focus();
        return;
    }
    if (vendor.trim() === "") {
        alert("Please select supplier!");
        $("#vendor").focus();
        return;
    }

    if (input.length >= MIN_BARCODE_LENGTH && /^\d+$/.test(input)) {
        stockinBarcodeSearchInProgress = true;
        sendStockinRequest(input, 'barcode', invoice, vendor);

        setTimeout(() => {
            stockinBarcodeSearchInProgress = false;
        }, 700);
    } else if (input.length >= MIN_ITEM_NAME_LENGTH && !stockinBarcodeSearchInProgress) {
        stockinTypingTimeout = setTimeout(() => {
            sendStockinRequest(input, 'item_name', invoice, vendor);
        }, DEBOUNCE_DELAY);
    }
}

function sendStockinRequest(input, type, invoice, vendor) {
    if (stockinCurrentRequest && stockinCurrentRequest.readyState !== 4) {
        stockinCurrentRequest.abort();
    }

    stockinCurrentRequest = $.ajax({
        type: "POST",
        url: "../controller/get_item_stockin.php",
        data: { item: input, type: type, invoice: invoice, vendor: vendor },
        beforeSend: function() {
               $("#sales_item").html("<p>Searching...</p>");
          },
        success: function(response) {
            $("#sales_item").html(response);
        },
        error: function(xhr, status, error) {
            if (status !== "abort") {
                console.error("Fetch error:", status, error);
                $("#sales_item").html("<p>Failed to fetch item. Please try again.</p>");
            }
        }
    });

    $("#invoice").attr("readonly", true);
    $("#vendor").attr("readonly", true);
}
//get item for transfer
function getItemTransfer(item_name){
     let item = item_name;
     // alert(check_room);
     // return;
     let invoice = document.getElementById("invoice").value;
     let store_to = document.getElementById("store_to").value;
     if(store_to.length == 0 || store_to.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a store!");
          $("#store_to").focus();
          return;
     }else{
          if(item.length >= 3){
               if(item){
                    $.ajax({
                         type : "POST",
                         url :"../controller/get_item_transfer.php",
                         data : {item:item,  store_to:store_to, invoice:invoice},
                         beforeSend : function(){
                              $("#sales_item").html("<p>Searching...</p>");
                         },
                         success : function(response){
                              $("#sales_item").html(response);
                         }
                    })
                    $("#store_to").attr("readonly", true);
                    return false;
               }else{
                    $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
               }
          }
     }
     
}
//get customer statement
function getCustomer(customer_id){
     let customer = customer_id;
     // alert(check_room);
     // return;
     let fromDate = document.getElementById("fromDate").value;
     let toDate = document.getElementById("toDate").value;
     if(fromDate.length == 0 || fromDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#fromDate").focus();
          return;
     }else if(toDate.length == 0 || toDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#toDate").focus();
          return;
     }else{
     if(customer.length >= 3){
          if(customer){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_customer.php",
                    data : {customer:customer, fromDate:fromDate, toDate:toDate},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               /* $("#fromDate").attr("readonly", true);
               $("#toDate").attr("readonly", true); */
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
}
     
}
//get item for stockin history
function getStockinItem(item_name){
     let item = item_name;
     // alert(check_room);
     // return;
     let fromDate = document.getElementById("fromDate").value;
     let toDate = document.getElementById("toDate").value;
     if(fromDate.length == 0 || fromDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#fromDate").focus();
          return;
     }else if(toDate.length == 0 || toDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#toDate").focus();
          return;
     }else{
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_item_purchase.php",
                    data : {item:item, fromDate:fromDate, toDate:toDate},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               /* $("#fromDate").attr("readonly", true);
               $("#toDate").attr("readonly", true); */
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
}
     
}
//search vendor history
function vendorHistory(){
     let vendor = document.getElementById("vendor").value;
     // alert(check_room);
     // return;
     let fromDate = document.getElementById("fromDate").value;
     let toDate = document.getElementById("toDate").value;
     if(fromDate.length == 0 || fromDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#fromDate").focus();
          return;
     }else if(toDate.length == 0 || toDate.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#toDate").focus();
          return;
     }else if(vendor.length == 0 || vendor.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a vendor!");
          $("#toDate").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url :"../controller/vendor_history.php",
               data : {vendor:vendor, fromDate:fromDate, toDate:toDate},
               beforeSend : function(){
                    $(".new_data").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".new_data").html(response);
               }
          })
         
     }
}
   
//add direct sales 
function addSales(item_id){
     let item = item_id;
     let invoice = document.getElementById("invoice").value;
     $.ajax({
          type : "GET",
          url : "../controller/add_sales.php?sales_item="+item+"&invoice="+invoice,
          beforeSend : function(){
               $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".sales_order").html(response);
          }
     })
     $("#sales_item").html("");
     $("#item").val('');
     $("#item").focus();

     return false;
}

//add sales order
function addSalesOrder(item_id){
     let item = item_id;
     let invoice = document.getElementById("invoice").value;

     $.ajax({
          type : "GET",
          url : "../controller/add_sales_order.php?sales_item="+item+"&invoice="+invoice,
          beforeSend : function(){
               $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".sales_order").html(response);
          }
     })
     $("#sales_item").html("");
     $("#item").val('');
     $("#item").focus();


     return false;
}
//add direct wholesales 
function addWholeSales(item_id){
     let item = item_id;
     let customer = document.getElementById("customer").value;
     let invoice = document.getElementById("invoice").value;
     $.ajax({
          type : "GET",
          url : "../controller/add_wholesale.php?sales_item="+item+"&customer="+customer+"&invoice="+invoice,
          beforeSend : function(){
               $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".sales_order").html(response);
          }
     })
     $("#sales_item").html("");
     $("#item").val('');
     $("#item").focus();
     return false;
}
//add rep sales
function addRepSales(item_id){
     let item = item_id;
     let customer = document.getElementById("customer").value;
     let invoice = document.getElementById("invoice").value;
     $.ajax({
          type : "GET",
          url : "../controller/add_repsale.php?sales_item="+item+"&customer="+customer+"&invoice="+invoice,
          success : function(response){
               $(".sales_order").html(response);
          }
     })
     $("#sales_item").html("");
     $("#item").val('');

     return false;
}
//delete individual items from direct sales
function deleteSales(sales, item){
     let confirmDel = confirm("Are you sure you want to remove this item?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_sales.php?sales_id="+sales+"&item_id="+item,
               success : function(response){
                    $(".sales_order").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}
//delete item
function deleteItem(item){
     let confirmDel = confirm("Are you sure you want to delete this item?", "");
     if(confirmDel){
          $.ajax({
               type : "GET",
               url : "../controller/delete_item.php?item="+item,
               beforeSend : function(){
                    $("#delete_item").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#delete_item").html(response);
               }
          })
          setTimeout(function(){
               $("#delete_item").load("delete_item.php #delete_item");
          }, 2000);
          return false;
          
     }else{
          return;
     }
}
//delete individual items from sales order
function deleteSalesOrder(sales, item){
     let confirmDel = confirm("Are you sure you want to remove this item?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_sales_order.php?sales_id="+sales+"&item_id="+item,
               success : function(response){
                    $(".sales_order").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}
//delete individual items from direct wholesale
function deleteWholesale(sales, item){
     let confirmDel = confirm("Are you sure you want to remove this item?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_wholesale.php?sales_id="+sales+"&item_id="+item,
               success : function(response){
                    $(".sales_order").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}
//delete individual items from direct repsale
function deleteRepsale(sales, item){
     let confirmDel = confirm("Are you sure you want to remove this item?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_repsale.php?sales_id="+sales+"&item_id="+item,
               success : function(response){
                    $(".sales_order").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}
//increase quantity for direct sales item
function increaseQty(sales, item){
     // alert(sales);
     $.ajax({
          type : "GET",
          url : "../controller/increase_qty.php?sales_id="+sales+"&item_id="+item,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//increase quantity for sales order item
function increaseQtyOrder(sales, item){
     // alert(sales);
     $.ajax({
          type : "GET",
          url : "../controller/increase_qty_order.php?sales_id="+sales+"&item_id="+item,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//increase quantity for direct wholesalesales item
function increaseQtyWholesale(sales, item){
     // alert(sales);
     $.ajax({
          type : "GET",
          url : "../controller/increase_qty_wholesale.php?sales_id="+sales+"&item_id="+item,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//increase quantity for direct repsales item
function increaseQtyRepsale(sales, item){
     // alert(sales);
     $.ajax({
          type : "GET",
          url : "../controller/increase_qty_repsales.php?sales_id="+sales+"&item_id="+item,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//decrease quantity for direct sales item
function reduceQty(sales){
     $.ajax({
          type : "GET",
          url : "../controller/decrease_qty.php?item="+sales,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//decrease quantity for sales order item
function reduceQtyOrder(sales){
     $.ajax({
          type : "GET",
          url : "../controller/decrease_qty_order.php?item="+sales,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//decrease quantity for direct wholesalesales item
function reduceQtyWholesale(sales){
     $.ajax({
          type : "GET",
          url : "../controller/decrease_qty_wholesale.php?item="+sales,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//decrease quantity for direct repsales item
function reduceQtyRepsale(sales){
     $.ajax({
          type : "GET",
          url : "../controller/decrease_qty_repsale.php?item="+sales,
          success : function(response){
               $(".sales_order").html(response);
          }
          
     })
     return false;
}
//show more options for sales item to edit price and quantity
function showMore(sales){
     $.ajax({
          type : "GET",
          url : "../controller/edit_price_qty.php?item="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
               window.scrollTo(0, 0);
          }
          
     })
     return false;
}
//show more options for sales order item to edit price and quantity
function showMoreOrder(sales){
     $.ajax({
          type : "GET",
          url : "../controller/edit_price_qty_order.php?item="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
               window.scrollTo(0, 0);

          }
          
     })
     return false;
}
//show more options for sales item to edit price and quantity
function showMoreWholesale(sales){
     $.ajax({
          type : "GET",
          url : "../controller/edit_price_qty_wholesale.php?item="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
               window.scrollTo(0, 0);

          }
          
     })
     return false;
}
//show more options for rep sales item to edit price and quantity
function showMoreRepsale(sales){
     $.ajax({
          type : "GET",
          url : "../controller/edit_price_qty_repsale.php?item="+sales,
          success : function(response){
               $(".show_more").html(response);
               window.scrollTo(0, 0);

          }
          
     })
     return false;
}
//update sales quantity and price for direct sales
function updatePriceQty(){
     let sales_id = document.getElementById("sales_id").value;
     let qty = document.getElementById("qty").value;
     let price = document.getElementById("price").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(qty.length == 0 || qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#qty").focus();
          return;
     }else if(price.length == 0 || price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#price").focus();
          return;
     }else if(qty < 1){
          alert("Qauntity cannot be zero or negative!");
          $("#qty").focus();
          return;
     }else if(price < 1){
          alert("Price cannot be zero or negative!");
          $("#price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_price_qty.php",
               data: {sales_id:sales_id, qty:qty, price:price},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//update sales quantity and price for sales order
function updatePriceQtyOrder(){
     let sales_id = document.getElementById("sales_id").value;
     let qty = document.getElementById("qty").value;
     let price = document.getElementById("price").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(qty.length == 0 || qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#qty").focus();
          return;
     }else if(price.length == 0 || price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#price").focus();
          return;
     }else if(qty < 1){
          alert("Qauntity cannot be zero or negative!");
          $("#qty").focus();
          return;
     }else if(price < 1){
          alert("Price cannot be zero or negative!");
          $("#price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_price_qty_order.php",
               data: {sales_id:sales_id, qty:qty, price:price},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
                    $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//update sales quantity and price for wholesale
function updatePriceQtyWh(){
     let sales_id = document.getElementById("sales_id").value;
     let qty = document.getElementById("qty").value;
     let price = document.getElementById("price").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(qty.length == 0 || qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#qty").focus();
          return;
     }else if(price.length == 0 || price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#price").focus();
          return;
     }else if(qty < 1){
          alert("Qauntity cannot be zero or negative!");
          $("#qty").focus();
          return;
     }else if(price < 1){
          alert("Price cannot be zero or negative!");
          $("#price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_price_qty_who.php",
               data: {sales_id:sales_id, qty:qty, price:price},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//update sales quantity and markup for repsales
function updatePriceQtyRep(){
     let sales_id = document.getElementById("sales_id").value;
     let qty = document.getElementById("qty").value;
     let markup = document.getElementById("markup").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(qty.length == 0 || qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#qty").focus();
          return;
     }else if(markup.length == 0 || markup.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input % markup!");
          $("#markup").focus();
          return;
     }else if(qty < 1){
          alert("Qauntity cannot be zero or negative!");
          $("#qty").focus();
          return;
0   }else if(markup < 0){
          alert("markup cannot be zero or negative!");
          $("markup ").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/update_price_qty_rep.php",
               data: {sales_id:sales_id, qty:qty, markup:markup},
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//get item pack price and size for direct sales
function getPack(sales){
     $.ajax({
          type : "GET",
          url : "../controller/get_pack.php?sales_id="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
          }
          
     })
     return false;
}
//get item pack price and size for sales order
function getPackSo(sales){
     $.ajax({
          type : "GET",
          url : "../controller/get_pack_so.php?sales_id="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
          }
          
     })
     return false;
}
//get item pack price and size for wholesale
function getWholesalePack(sales){
     $.ajax({
          type : "GET",
          url : "../controller/get_pack_wholesale.php?sales_id="+sales,
          beforeSend : function(){
               $(".show_more").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".show_more").html(response);
          }
          
     })
     return false;
}
//get item carton/role price and size for wholesale
function getCartonRole(sales){
     $.ajax({
          type : "GET",
          url : "../controller/get_carton_role.php?sales_id="+sales,
          success : function(response){
               $(".show_more").html(response);
          }
          
     })
     return false;
}
//sell item in pack or carton for either wholesale or retail
function sellPack(url){
     let sales_id = document.getElementById("sales_id").value;
     let pack_qty = document.getElementById("pack_qty").value;
     let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(pack_qty.length == 0 || pack_qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price.length == 0 || pack_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#pack_price").focus();
          return;
     }else if(pack_qty <= 0 ){
          alert("Qauntity cannot be zero or negative!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price <= 0){
          alert("Price cannot be zero or negative!");
          $("#pack_price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/"+url,
               data: {sales_id:sales_id, pack_qty:pack_qty, pack_price:pack_price, pack_size:pack_size},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//sell item in pack for sales order
function sellPackSo(){
     let sales_id = document.getElementById("sales_id").value;
     let pack_qty = document.getElementById("pack_qty").value;
     let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(pack_qty.length == 0 || pack_qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price.length == 0 || pack_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#pack_price").focus();
          return;
     }else if(pack_qty <= 0){
          alert("Qauntity cannot be zero or negative!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price <= 0){
          alert("Price cannot be zero or negative!");
          $("#pack_price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/sell_pack_so.php",
               data: {sales_id:sales_id, pack_qty:pack_qty, pack_price:pack_price, pack_size:pack_size},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//sell item in pack for wholesale
function sellPackWholesale(){
     let sales_id = document.getElementById("sales_id").value;
     let pack_qty = document.getElementById("pack_qty").value;
     let pack_price = document.getElementById("pack_price").value;
     let pack_size = document.getElementById("pack_size").value;
     // let inv_qty = document.getElementById("inv_qty").value;
     /* authentication */
     if(pack_qty.length == 0 || pack_qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input quantity!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price.length == 0 || pack_price.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input unit price!");
          $("#pack_price").focus();
          return;
     }else if(pack_qty <= 0 ){
          alert("Qauntity cannot be zero or negative!");
          $("#pack_qty").focus();
          return;
     }else if(pack_price <= 0){
          alert("Price cannot be zero or negative!");
          $("#pack_price").focus();
          return;
     /* }else if(qty > inv_qty){
          alert("Available quantity is less than required!");
          $("#qty").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/sell_pack_wholesale.php",
               data: {sales_id:sales_id, pack_qty:pack_qty, pack_price:pack_price, pack_size:pack_size},
               beforeSend : function(){
                    $(".sales_order").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".sales_order").html(response);
               }
          });

     }
     $(".show_more").html('');
     return false;
}
//check payment mode
function checkMode(mode){
     let pay_mode = mode;
     let bank_input = document.getElementById("selectBank");
     let multiples = document.getElementById("multiples");
     let wallet = document.getElementById("account_balance");
     if(pay_mode == "POS" || pay_mode == "Transfer"){
          bank_input.style.display = "block";
          multiples.style.display = "none";
          wallet.style.display = "none";
     }else if(pay_mode == "Multiple"){
          multiples.style.display = "block";
          bank_input.style.display = "block";
          wallet.style.display = "none";
     }else if(pay_mode == "Wallet"){
          wallet.style.display = "block";
          multiples.style.display = "none";
          bank_input.style.display = "none";
     }else{
          bank_input.style.display = "none";
          multiples.style.display = "none";
          wallet.style.display = "none";

     }
}
//check payment mode for rep sales
/* function checkRepMode(mode){
     let pay_mode = mode;
     let bank_input = document.getElementById("selectBank");
     let multiples = document.getElementById("multiples");
     let deposited = document.getElementById("deposited");
     let wallet = document.getElementById("account_balance");
     if(pay_mode == "POS" || pay_mode == "Transfer"){
          bank_input.style.display = "block";
          multiples.style.display = "none";
          wallet.style.display = "none";
          deposited.style.display = "none";
     }else if(pay_mode == "Multiple"){
          multiples.style.display = "block";
          bank_input.style.display = "block";
          wallet.style.display = "none";
          deposited.style.display = "none";
     }else if(pay_mode == "Wallet"){
          wallet.style.display = "block";
          multiples.style.display = "none";
          bank_input.style.display = "none";
          deposited.style.display = "none";
     }else if(pay_mode == "Deposit"){
          wallet.style.display = "none";
          multiples.style.display = "none";
          bank_input.style.display = "none";
          deposited.style.display = "block";

     }else{
          bank_input.style.display = "none";
          multiples.style.display = "none";
          wallet.style.display = "none";
          deposited.style.display = "none";

     }
} */
//check payment mode for wholesales
function checkRepMode(mode){
     let pay_mode = mode;
     let bank_input = document.getElementById("selectBank");
     let multiples = document.getElementById("multiples");
     let deposited = document.getElementById("deposited");
     let dep_mode = document.getElementById("dep_mode");
     let wallet = document.getElementById("account_balance");
     if(pay_mode == "POS" || pay_mode == "Transfer"){
          bank_input.style.display = "block";
          multiples.style.display = "none";
          wallet.style.display = "none";
          deposited.style.display = "none";
          dep_mode.style.display = "none";
     }else if(pay_mode == "Multiple"){
          multiples.style.display = "block";
          bank_input.style.display = "block";
          wallet.style.display = "none";
          deposited.style.display = "none";
          dep_mode.style.display = "none";
     }else if(pay_mode == "Wallet"){
          wallet.style.display = "block";
          multiples.style.display = "none";
          bank_input.style.display = "none";
          deposited.style.display = "none";
          dep_mode.style.display = "none";
     }else if(pay_mode == "Deposit"){
          wallet.style.display = "none";
          multiples.style.display = "none";
          bank_input.style.display = "none";
          deposited.style.display = "block";
          dep_mode.style.display = "block";

     }else{
          bank_input.style.display = "none";
          multiples.style.display = "none";
          wallet.style.display = "none";
          deposited.style.display = "none";
          dep_mode.style.display = "none";

     }
}
//post direct sales payment
function postSales(){
     let customer_id = document.getElementById("customer_id").value;
     let total_amount = document.getElementById("total_amount").value;
     let sales_invoice = document.getElementById("sales_invoice").value;
     let discount = document.getElementById("discount").value;
     let store = document.getElementById("store").value;
     let payment_type = document.getElementById("payment_type").value;
     let bank = document.getElementById("bank").value;
     let multi_cash = document.getElementById("multi_cash").value;
     let multi_pos = document.getElementById("multi_pos").value;
     let multi_transfer = document.getElementById("multi_transfer").value;
     let sum_amount = parseInt(multi_cash) + parseInt(multi_pos) + parseInt(multi_transfer);
     if(payment_type == "Transfer" || payment_type == "POS" || payment_type == "Multiple"){
          if(bank.length == 0 || bank.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select bank!");
               $("#bank").focus();
               return;
          }
     }
     if(document.getElementById("multiples").style.display == "block"){
          if(sum_amount != (parseInt(total_amount) - parseInt(discount))){
               alert("Amount entered is not equal to total amount");
               $("#multi_cash").focus();
               return;
          }
     }
     if(payment_type.length == 0 || payment_type.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a payment option!");
          $("#payment_type").focus();
          return;
     }else if(discount.length == 0 || discount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter discount value or 0!");
          $("#discount").focus();
          return;
     }else if(!customer_id){
          alert("Please select a customer!");
          $("#customer").focus();
          return;
     }else{
          let confirmPost = confirm("Are you sure you want to post this sales?", "");
          if(confirmPost){
               $.ajax({
                    type : "POST",
                    url : "../controller/post_sales.php",
                    data : {sales_invoice:sales_invoice, payment_type:payment_type, bank:bank, multi_cash:multi_cash, multi_pos:multi_pos, multi_transfer:multi_transfer, discount:discount, store:store,customer_id:customer_id},
                    beforeSend : function(){
                         $("#direct_sales").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                         $("#direct_sales").html(response);
                    }
               });
               $(".sales_order").html('');
               /* setTimeout(function(){
                    $("#direct_sales").load("direct_sales.php #direct_sales");
               }, 200);
               return false; */
          }else{
               return;
          }
     // }
     }
}
//post sales order payment
function postSalesOrder(){
     let total_amount = document.getElementById("total_amount").value;
     let discount = document.getElementById("discount").value;
     // alert(total_amount);
     let sales_invoice = document.getElementById("sales_invoice").value;
     let payment_type = document.getElementById("payment_type").value;
     let bank = document.getElementById("bank").value;
     let store = document.getElementById("store").value;
     let multi_cash = document.getElementById("multi_cash").value;
     let multi_pos = document.getElementById("multi_pos").value;
     let multi_transfer = document.getElementById("multi_transfer").value;
     let sum_amount = parseInt(multi_cash) + parseInt(multi_pos) + parseInt(multi_transfer);
     if(document.getElementById("multiples").style.display == "block"){
          //check if total amount is greater than sum
          if(sum_amount != (total_amount - discount)){
               alert("Amount entered is not equal to total amount");
               $("#multi_cash").focus();
               return;
          }
     }
     if(payment_type == "Transfer" || payment_type == "POS" || payment_type == "Multiple"){
          if(bank.length == 0 || bank.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select bank!");
               $("#bank").focus();
               return;
          }
     }
     if(payment_type.length == 0 || payment_type.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a payment option!");
          $("#payment_type").focus();
          return;
     }else if(discount.length == 0 || discount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter discount value or 0!");
          $("#discount").focus();
          return;
     }else{
          let confirmPost = confirm("Are you sure you want to post this sales?", "");
          if(confirmPost){
               $.ajax({
                    type : "POST",
                    url : "../controller/post_sales_order.php",
                    data : {sales_invoice:sales_invoice, payment_type:payment_type, bank:bank, multi_cash:multi_cash, multi_pos:multi_pos, multi_transfer:multi_transfer, discount:discount, store:store},
                    beforeSend : function(){
                         $("#sales_details").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                         $("#sales_details").html(response);
                    }
               })
               // $(".sales_order").html('');
               /* setTimeout(function(){
                    $("#direct_sales").load("direct_sales.php #direct_sales");
               }, 200);
               return false; */
          }else{
               return;
          }
     }
}
//post sales order ticket
function printSalesOrder(){
     let confirmPost = confirm("Are you sure you want to post this sales?", "");
     if(confirmPost){
          let sales_invoice = document.getElementById("sales_invoice").value;
          
          
          $.ajax({
               type : "POST",
               url : "../controller/post_ticket.php",
               data : {sales_invoice:sales_invoice},
               success : function(response){
                    $("#sales_order").html(response);
               }
          })
          $(".sales_order").html('');
          /* setTimeout(function(){
               $("#direct_sales").load("direct_sales.php #direct_sales");
          }, 200);
          return false; */
     }
}
// prinit transfer receipt
function printTransferReceipt(invoice){
     window.open("../controller/transfer_receipt.php?receipt="+invoice);
     // alert(item_id);
     /* $.ajax({
          type : "GET",
          url : "../controller/sales_receipt.php?receipt="+invoice,
          success : function(response){
               $("#direct_sales").html(response);
          }
     }) */
     /* setTimeout(function(){
          $("#direct_sales").load("direct_sales.php #direct_sales");
     }, 100);
     return false; */
 
 }
//post direct wholesale payment
function postWholesale(){
     let total_amount = document.getElementById("total_amount").value;
     let sales_invoice = document.getElementById("sales_invoice").value;
     let discount = document.getElementById("discount").value;
     let store = document.getElementById("store").value;
     let customer_id = document.getElementById("customer_id").value;
     let payment_type = document.getElementById("payment_type").value;
     let bank = document.getElementById("bank").value;
     let multi_cash = document.getElementById("multi_cash").value;
     let multi_pos = document.getElementById("multi_pos").value;
     let multi_transfer = document.getElementById("multi_transfer").value;
     let wallet = document.getElementById("wallet").value;
     let deposit = document.getElementById("deposit").value;
     let contra = document.getElementById("contra").value;
     let sum_amount = parseInt(multi_cash) + parseInt(multi_pos) + parseInt(multi_transfer);
     if(document.getElementById("multiples").style.display == "block"){
          if(sum_amount != (parseInt(total_amount) - parseInt(discount))){
               alert("Amount entered is not equal to total amount");
               $("#multi_cash").focus();
               return;
          }
     }
     if(document.getElementById("account_balance").style.display == "block"){
          if(parseInt(total_amount - discount) > parseInt(wallet)){
               alert("Insufficient balance! Kindly fund wallet");
               $("#payment_type").focus();
               return;
          }
     }
     if(document.getElementById("deposited").style.display == "block"){
          if(!deposit || parseInt(deposit) <= 0){
               alert("Input deposit amount");
               $("#deposit").focus();
               return;
          }
          /* if(deposit.length == 0 || deposit.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please input deposited amount!");
               $("#deposit").focus();
               return;
          } */
          if(contra.length == 0 || contra.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select deposit mode!");
               $("#contra").focus();
               return;
          }
     }
     if(payment_type == "Transfer" || payment_type == "POS" || payment_type == "Multiple"){
          if(bank.length == 0 || bank.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select bank!");
               $("#bank").focus();
               return;
          }
     }
     if(payment_type.length == 0 || payment_type.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a payment option!");
          $("#payment_type").focus();
          return;
     }else if(discount.length == 0 || discount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter discount value or 0!");
          $("#discount").focus();
          return;
     }else{
          let confirmPost = confirm("Are you sure you want to post this sales?", "");
          if(confirmPost){
               $.ajax({
                    type : "POST",
                    url : "../controller/post_wholesale.php",
                    data : {sales_invoice:sales_invoice, payment_type:payment_type, bank:bank, multi_cash:multi_cash, multi_pos:multi_pos, multi_transfer:multi_transfer, discount:discount, wallet:wallet, store:store, deposit:deposit, customer_id:customer_id,contra:contra},
                    beforeSend : function(){
                         $("#direct_sales").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                         $("#direct_sales").html(response);
                    }
               })
               $(".sales_order").html('');
               /* setTimeout(function(){
                    $("#direct_sales").load("direct_sales.php #direct_sales");
               }, 200); */
               return false;
          }else{
               return;
          }
     // }
     }
}
//post direct repsale payment
function postRepsale(){
     let confirmPost = confirm("Are you sure you want to post this sales?", "");
     if(confirmPost){
          let total_amount = document.getElementById("total_amount").value;
          let sales_invoice = document.getElementById("sales_invoice").value;
          let discount = document.getElementById("discount").value;
          let store = document.getElementById("store").value;
          let customer_id = document.getElementById("customer_id").value;
          let payment_type = document.getElementById("payment_type").value;
          let bank = document.getElementById("bank").value;
          let multi_cash = document.getElementById("multi_cash").value;
          let multi_pos = document.getElementById("multi_pos").value;
          let multi_transfer = document.getElementById("multi_transfer").value;
          let wallet = document.getElementById("wallet").value;
          let deposit = document.getElementById("deposit").value;
          let sum_amount = parseInt(multi_cash) + parseInt(multi_pos) + parseInt(multi_transfer);
          if(document.getElementById("multiples").style.display == "block"){
               if(sum_amount != (parseInt(total_amount) - parseInt(discount))){
                    alert("Amount entered is not equal to total amount");
                    $("#multi_cash").focus();
                    return;
               }
          }
          if(document.getElementById("account_balance").style.display == "block"){
               if(parseInt(total_amount - discount) > parseInt(wallet)){
                    alert("Insufficient balance! Kindly fund wallet");
                    $("#payment_type").focus();
                    return;
               }
          }
          if(document.getElementById("deposited").style.display == "block"){
               if(parseInt(deposit) <= 0){
                    alert("Input deposit amount");
                    $("#deposit").focus();
                    return;
               }
               if(deposit.length == 0 || deposit.replace(/^\s+|\s+$/g, "").length == 0){
                    alert("Please input deposited amount!");
                    $("#deposit").focus();
                    return;
               }
          }
          if(payment_type.length == 0 || payment_type.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select a payment option!");
               $("#payment_type").focus();
               return;
          }else if(discount.length == 0 || discount.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please enter discount value or 0!");
               $("#discount").focus();
               return;
          }else{
               $.ajax({
                    type : "POST",
                    url : "../controller/post_repsale.php",
                    data : {sales_invoice:sales_invoice, payment_type:payment_type, bank:bank, multi_cash:multi_cash, multi_pos:multi_pos, multi_transfer:multi_transfer, discount:discount, wallet:wallet, store:store, deposit:deposit,  customer_id:customer_id},
                    success : function(response){
                         $("#direct_sales").html(response);
                    }
               })
               $(".sales_order").html('');
               /* setTimeout(function(){
                    $("#direct_sales").load("direct_sales.php #direct_sales");
               }, 200);
               return false; */
          }
     // }
     }else{
          return;
     }
}
 //adjust item quantity
 function adjustReorderLevel(){
     let item_id = document.getElementById("item_id").value;
     let rol = document.getElementById("rol").value;
     if(rol.length == 0 || rol.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input reorder level!");
          $("#rol").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/reorder_level.php",
               data: {item_id:item_id, rol:rol},
               beforeSend : function(){
                    $("#reorder_levels").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#reorder_levels").html(response);
               }
          })
          setTimeout(function(){
               $("#reorder_levels").load("reorder_level.php #reorder_levels");
          }, 2000);
          return false
     }
 }

 //display sales return form
function displaySales(sales_id){
     // alert(item_id);
     $.ajax({
          type : "GET",
          url : "../controller/get_sales.php?sales_id="+sales_id,
          beforeSend : function(){
               $(".select_date").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".select_date").html(response);
               window.scrollTo(0, 0);

          }
     })
     return false;
 
 }
 //sales return
 function returnSales(){
     let return_sales = confirm("Are you sure you want to return this sales?", "");
     if(return_sales){
          let item = document.getElementById("item").value;
          let sold_qty = document.getElementById("sold_qty").value;
          let sales_id = document.getElementById("sales_id").value;
          let user_id = document.getElementById("user_id").value;
          let store = document.getElementById("store").value;
          let quantity = document.getElementById("quantity").value;
          let reason = document.getElementById("reason").value;
          let expiration = document.getElementById("expiration").value;
          let todayDate = new Date();
          // let today = todayDate.toLocaleDateString();
          if(quantity.length == 0 || quantity.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please input quantity!");
               $("#quantity").focus();
               return;
          }else if(parseInt(quantity) > parseInt(sold_qty)){
               alert("You cannot return more than what was sold!");
               $("#quantity").focus();
               return;
          }else if(parseInt(quantity) <= 0){
               alert("Please enter returned quantity!");
               $("#quantity").focus();
               return;
          }else if(reason.length == 0 || reason.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please input reason for return!");
               $("#reason").focus();
               return;
          }else if(expiration.length == 0 || expiration.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please input item expiration date!");
               $("#expiration").focus();
               return;
          }else if(todayDate > new Date(expiration)){
               alert("You can not return expired items!");
               $("#expiration").focus();
               return;
          }else{
               $.ajax({
                    type : "POST",
                    url : "../controller/return_sales.php",
                    data: {item:item, sales_id:sales_id, user_id:user_id, quantity:quantity, reason:reason, store:store, expiration:expiration},
                    beforeSend : function(){
                         $("#sales_return").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                         $("#sales_return").html(response);
                    }
               })
               setTimeout(function(){
                    $("#sales_return").load("sales_return.php #sales_return");
               }, 2000);
               return false
          }
     }else{
          return;
     }
}


// reprint receipt
function printReceipt(invoice){
     // alert(item_id);
     window.open("../controller/print_receipt.php?receipt="+invoice);
     /* $.ajax({
          type : "GET",
          url : "../controller/print_receipt.php?receipt="+invoice,
          success : function(response){
               $("#printReceipt").html(response);
          }
     })
     setTimeout(function(){
          $("#printReceipt").load("print_receipt.php #printReceipt");
     }, 100);
     return false; */
 
 }
// prinit sales receipt for direct sales
function printSalesReceipt(invoice){
     window.open("../controller/sales_receipt.php?receipt="+invoice);
     // alert(item_id);
     /* $.ajax({
          type : "GET",
          url : "../controller/sales_receipt.php?receipt="+invoice,
          success : function(response){
               $("#direct_sales").html(response);
          }
     }) */
     setTimeout(function(){
          $("#direct_sales").load("direct_sales.php #direct_sales");
     }, 100);
     return false;
 
 }
// prinit sales receipt for sales order
function printSalesOrderReceipt(invoice){
     window.open("../controller/sales_order_receipt.php?receipt="+invoice);
     showPage('post_sales_order.php');
     // alert(item_id);
     /* $.ajax({
          type : "GET",
          url : "../controller/sales_order_receipt.php?receipt="+invoice,
          success : function(response){
               $("#sales_details").html(response);
          }
     }) */
     /* setTimeout(function(){
          $("#direct_sales").load("direct_sales.php #direct_sales");
     }, 100);
     return false; */
 
 }
// prinit sales order ticket
function printSalesTicket(invoice){
     window.open("../controller/sales_order_ticket.php?receipt="+invoice);
     // alert(item_id);
     /* $.ajax({
          type : "GET",
          url : "../controller/sales_order_ticket.php?receipt="+invoice,
          success : function(response){
               $("#sales_order").html(response);
          }
     }) */
     setTimeout(function(){
          $("#sales_order").load("sales_order.php #sales_order");
     }, 100);
     return false;
 
 }
 //perform any type of search with just two date
 function search(url){
     let from_date = document.getElementById('from_date').value;
     let to_date = document.getElementById('to_date').value;
     /* authentication */
     if(from_date.length == 0 || from_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date!");
          $("#from_date").focus();
          return;
     }else if(to_date.length == 0 || to_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#to_date").focus();
          return;
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/"+url,
               data: {from_date:from_date, to_date:to_date},
               beforeSend: function(){
                   $(".new_data").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".new_data").html(response);
               }
          });
     }
     return false;
}
 //search dashboard reports
 function searchDashboard(board){
     let store = board;
     /* authentication */
     if(store.length == 0 || store.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a store!");
          $("#store").focus();
          return;
    /*  }else if(from_date.length == 0 || from_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date!");
          $("#from_date").focus();
          return;
     }else if(to_date.length == 0 || to_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#to_date").focus();
          return; */
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/search_dashboard.php",
               data: {store:store},
               success: function(response){
               $("#general_dashboard").html(response);
               }
          });
     }
     return false;
}
//change store
function changeStore(store, user){
     window.open("../controller/change_store.php?store="+store+"&user="+user, "_self");
}
// Post daily expense 
function postExpense(){
     let posted = document.getElementById("posted").value;
     let store = document.getElementById("store").value;
     let exp_date = document.getElementById("exp_date").value;
     let exp_head = document.getElementById("exp_head").value;
     let amount = document.getElementById("amount").value;
     let details = document.getElementById("details").value;
     let todayDate = new Date();
     if(exp_date.length == 0 || exp_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter transaction date!");
          $("#exp_date").focus();
          return;
     }else if(new Date(exp_date) > todayDate){
          alert("You cannot enter a futuristic date!");
          $("#exp_date").focus();
          return;
     }else if(exp_head.length == 0 || exp_head.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select an expense head").focus();
          $("#exp_head").focus();
          return;
     }else if(amount.length == 0 || amount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input transaction amount");
          $("#amount").focus();
          return;
     }else if(details.length == 0 || details.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter description of transaction");
          $("#details").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/post_expense.php",
               data : {posted:posted, exp_date:exp_date, exp_head:exp_head, amount:amount, details:details, store:store},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#exp_date").val('');
     $("#exp_head").val('');
     $("#amount").val('');
     $("#details").val('');
     $("#exp_date").focus();
     return false;    
}


//add reasons for removal
function addReason(){
     let reason = document.getElementById("reason").value;
     if(reason.length == 0 || reason.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input reason!");
          $("#reason").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_reason.php",
               data : {reason:reason},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#reason").val('');
     $("#reason").focus();
     return false;
}
//  get item history
function getItemHistory(item){
     let from_date = document.getElementById('from_date').value;
     let to_date = document.getElementById('to_date').value;
     let history_item = item;
     /* authentication */
     if(from_date.length == 0 || from_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date!");
          $("#from_date").focus();
          return;
     }else if(to_date.length == 0 || to_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a date range!");
          $("#to_date").focus();
          return;
     }else if(history_item.length == 0 || history_item.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select an item!");
          $("#history_item").focus();
          return;
     }else{
          $.ajax({
               type: "POST",
               url: "../controller/get_history.php",
               data: {from_date:from_date, to_date:to_date, history_item:history_item},
               beforeSend : function(){
                    $(".new_data").html("<div class='processing'><div class='loader'></div></div>");
               },
               success: function(response){
               $(".new_data").html(response);
               }
          });
          $("#sales_item").html('');
          $("#history_item").val('');
     }
     return false;
}

// get sub menus to add to rights
function getSubmenu(menu_id){
     let menu = menu_id;
     // alert(menu_id);
     // return;
     if(menu_id){
          $.ajax({
               type : "POST",
               url :"../controller/get_submenu.php",
               data : {menu:menu},
               success : function(response){
                    $("#sub_menu").html(response);
               }
          })
          return false;
     }else{
          $("#sub_menu").html("<option value'' selected>Select a menu first</option>")
     }
     
}
// get user rights
function getRights(user_id){
     let user = user_id;;
     if(user){
          $.ajax({
               type : "POST",
               url :"../controller/get_rights.php",
               data : {user:user},
               beforeSend : function(){
                    $(".rights").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".rights").html(response);
               }
          })
          return false;
     }else{
          $(".rights").html("<h3>Select a user</h3>")
     }
     
}
//add user rights
function addRights(right){
     let sub_menu = right;
     let menu = document.getElementById("menu").value;
     let user = document.getElementById("user").value;
     if(user.length == 0 || user.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select user!");
          $("#user").focus();
          return;
     }else if(menu.length == 0 || menu.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select a menu!");
          $("#menu").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_right.php",
               data : {user:user, menu:menu, sub_menu:sub_menu},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".info").html(response);
                    getRights(user);
               }              
          })
          return false;
     }

}
//delete right from user
function removeRight(right, user){
     let remove = confirm("Do you want to remove this right from the user?", "");
     if(remove){
          $.ajax({
               type : "GET",
               url : "../controller/delete_right.php?right="+right,
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $(".info").html(response);
                    getRights(user);

               }
          })
     }else{
          return;
     }
}

/* download any table data to excel */
function convertToExcel(table, title){
     $(`#${table}`).table2excel({
          filename: title
     });
}

//show help
/* show frequenty asked questions */
function showFaq(answer){
     let all_answers = document.querySelectorAll(".faq_notes");
     all_answers.forEach(function(notes){
          notes.style.display = "none";
     })
     document.getElementById(answer).style.display = "block";
}

//display items in revenue by category for current date
function viewItems(department_id){
     let department = department_id;
     $.ajax({
          type : "Get",
          url : "../controller/view_revenue_cat_items.php?department="+department,
          beforeSend : function(){
               $(".category_info").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".category_info").html(response);
               document.getElementById("cat_info").scrollIntoView();
          }
     })
     return false;
}
//display items in revenue by category for current date
function viewItemsDate(from, to, department_id){
     let department = department_id;
     $.ajax({
          type : "Get",
          url : "../controller/view_revenue_cat_items_date.php?department="+department+"&from="+from+"&to="+to,
          beforeSend : function(){
               $(".category_info").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".category_info").html(response);
               document.getElementById("cat_info").scrollIntoView();

          }
     })
     return false;
}

//give discount
function giveDiscount(){
     discount = document.getElementById("discount").value;
     discount_invoice = document.getElementById("discount_invoice").value;
     discount_total = document.getElementById("discount_total").value;
     if(discount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("please enter a discount value!");
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/give_discount.php",
               data : {discount_invoice:discount_invoice, discount_total:discount_total, discount},
               success : function(response){
                    $(".sales_order").html(response);
               }
          })
          return false;
     }

}

//delete individual transfered items from transfer
function deleteTransfer(transfer, item){
     let confirmDel = confirm("Are you sure you want to remove this item?", "");
     if(confirmDel){
          
          $.ajax({
               type : "GET",
               url : "../controller/delete_transfer.php?transfer_id="+transfer+"&item_id="+item,
               success : function(response){
                    $(".stocked_in").html(response);
               }
               
          })
          return false;
     }else{
          return;
     }
}

//post transfer
function postTransfer(invoice_number){
     invoice = invoice_number;
     confirmPost = confirm("Are you sure to post this transfer?", "");
     if(confirmPost){
          $.ajax({
               method : "GET",
               url : "../controller/post_transfer.php?invoice="+invoice,
               beforeSend : function(){
                    $("#stockin").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#stockin").html(response);
               }
          })
          return false;
     }else{
          return;
     }
}
//Accept items transferred
function acceptItem(invoice_number){
     invoice = invoice_number;
     confirmPost = confirm("Are you sure to accept this item?", "");
     if(confirmPost){
          $.ajax({
               method : "GET",
               url : "../controller/accept_item.php?transfer_id="+invoice,
               beforeSend : function(){
                    $("#accept_item").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#accept_item").html(response);
               }
          })
          setTimeout(function(){
               $("#accept_item").load("accept_items.php #accept_item");
          }, 1500);
          return false
     }else{
          return;
     }
}
//Reject items transferred
function rejectItem(invoice_number){
     invoice = invoice_number;
     confirmPost = confirm("Are you sure to reject this item?", "");
     if(confirmPost){
          $.ajax({
               method : "GET",
               url : "../controller/reject_item.php?transfer_id="+invoice,
               beforeSend : function(){
                    $("#accept_item").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#accept_item").html(response);
               }
          })
          setTimeout(function(){
               $("#accept_item").load("accept_items.php #accept_item");
          }, 2000);
          return false
     }else{
          return;
     }
}
//Get stock balance by store
function getStockBalance(store_id){
     store = store_id;
     $.ajax({
          method : "POST",
          url : "../controller/get_stock_balance.php",
          data : {store:store},
          beforeSend : function(){
               $(".store_balance").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $(".store_balance").html(response);
          }
     })
     return false
     
}

// Add new customer
function addCustomer(){
     let customer = document.getElementById("customer").value;
     let phone_number = document.getElementById("phone_number").value;
     let address = document.getElementById("address").value;
     // let customer_store = document.getElementById("customer_store").value;
     let email = document.getElementById("email").value;
     let social_media = document.getElementById("social_media").value;
     if(customer.length == 0 || customer.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer name!");
          $("#customer").focus();
          return;
     }else if(phone_number.length == 0 || phone_number.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer phone number").focus();
          $("#phone_number").focus();
          return;
    /*  }else if(customer_store.length == 0 || customer_store.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select store").focus();
          $("#customer_store").focus();
          return; */
     /* }else if(address.length == 0 || address.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input customer address");
          $("#address").focus();
          return;
     }else if(email.length == 0 || email.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer email address");
          $("#email").focus();
          return; */
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_customer.php",
               data : {customer:customer, phone_number:phone_number, email:email, address:address, social_media:social_media /* customer_store:customer_store */},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#customer").val('');
     $("#email").val('');
     $("#address").val('');
     $("#phone_number").val('');
     $("#customer").focus();
     return false;    
}

//post other payments
//post other Transfer payments for guest
function postOtherPayment(){
     let mode = document.getElementById("mode").value;
     let posted = document.getElementById("posted").value;
     let customer = document.getElementById("customer").value;
     let invoice = document.getElementById("invoice").value;
     let amount = document.getElementById("amount").value;
     
     $.ajax({
          type : "POST",
          url : "../controller/post_other_payments.php",
          data : {posted:posted, customer:customer, mode:mode, amount:amount, invoice:invoice},
          beforeSend : function(){
               $("#debt_payment").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $("#debt_payment").html(response);
          }
     })
     
     return false;    

}

//add menu
function addMenu(){
     let menu = document.getElementById("menu").value;
     if(menu.length == 0 || menu.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input menu!");
          $("#menu").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_menu.php",
               data : {menu:menu},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     $("#menu").val('');
     $("#menu").focus();
     return false;
}
//add sub-menu
function addSubMenu(){
     let menus = document.getElementById("menus").value;
     let sub_menu = document.getElementById("sub_menu").value;
     let sub_menu_url = document.getElementById("sub_menu_url").value;
     let package = document.getElementById("package").value;
     if(menus.length == 0 || menus.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select menu!");
          $("#menus").focus();
          return;
     }else if(package.length == 0 || package.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select package!");
          $("#package").focus();
          return;
     }else if(sub_menu.length == 0 || sub_menu.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input sub-menu!");
          $("#sub_menu").focus();
          return;
     }else if(sub_menu_url.length == 0 || sub_menu_url.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input sub-menu url!");
          $("#sub_menu_url").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_sub_menu.php",
               data : {menus:menus, sub_menu:sub_menu, sub_menu_url:sub_menu_url, package:package},
               beforeSend : function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#menus").val('');
     $("#sub_menu").val('');
     $("#sub_menu_url").val('');
     $("#sub_menu").focus();
     return false;
}
//update submenu details
function updateSubMenu(){
     let sub_menu_id = document.getElementById("sub_menu_id").value;
     let menu = document.getElementById("menu").value;
     let package = document.getElementById("package").value;
     let sub_menu = document.getElementById("sub_menu").value;
     let url = document.getElementById("url").value;
     let status = document.getElementById("status").value;
     if(menu.length == 0 || menu.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select menuy!");
          $("#menu").focus();
          return;
     }else if(sub_menu.length == 0 || sub_menu.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input sub-menu!");
          $("#sub_menu").focus();
          return;
     }else if(package.length == 0 || package.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select package!");
          $("#package").focus();
          return;
     }else if(url.length == 0 || url.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input sub-menu url!");
          $("#url").focus();
          return;
     }else if(status.length == 0 || status.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input sub-menu status!");
          $("#status").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/update_submenu.php",
               data: {sub_menu_id:sub_menu_id, menu:menu, sub_menu:sub_menu, url:url, status:status, package:package},
               beforeSend : function(){
                    $("#change_sub_menu").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#change_sub_menu").html(response);
                     setTimeout(function(){
                         showPage("edit_sub_menu.php");
                    }, 1000);
               }
          })
         
          return false
     }
 }
 //get customer on key press
function getCustomers(input){
     $("#search_results").show();
     if(input.length >= 3){
          $.ajax({
               type : "POST",
               url : "../controller/get_customer_name.php?input="+input,
               beforeSend : function(){
                    $("#search_results").html("<p>Searching...</p>");
               },
               success : function(response){
                    $("#search_results").html(response);
               }
          })
     }
     
}
 //get customer on key press for editing
function getCustomerEdit(input){
     $("#search_results").show();
     if(input.length >= 3){
          $.ajax({
               type : "POST",
               url : "../controller/get_customer_edit.php?input="+input,
               beforeSend : function(){
                    $("#search_results").html("<p>Searching...</p>");
               },
               success : function(response){
                    $("#search_results").html(response);
               }
          })
     }
     
}
// update customer details
function updateCustomer(){
     let customer_id = document.getElementById("customer_id").value;
     let customer = document.getElementById("customer").value;
     let phone_number = document.getElementById("phone_number").value;
     let address = document.getElementById("address").value;
     // let customer_store = document.getElementById("customer_store").value;
     let email = document.getElementById("email").value;
     if(customer.length == 0 || customer.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer name!");
          $("#customer").focus();
          return;
     }else if(phone_number.length == 0 || phone_number.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer phone number").focus();
          $("#phone_number").focus();
          return;
    /* }else if(customer_store.length == 0 || customer_store.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select store").focus();
          $("#customer_store").focus();
          return;
    }else if(address.length == 0 || address.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input customer address");
          $("#address").focus();
          return;
     }else if(email.length == 0 || email.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer email address");
          $("#email").focus();
          return; */
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/update_customer.php",
               data : {customer_id:customer_id, customer:customer, phone_number:phone_number, email:email, address:address/* , customer_store:customer_store */},
               beforeSend : function(){
                    $("#edit_customer").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $("#edit_customer").html(response);
               }
          })
     }
     setTimeout(function(){
          $("#edit_customer").load("edit_customer_info.php #edit_customer");
     }, 1000);

     return false;    
}
 //get vendor on key press for editing
function getVendorEdit(input){
     $("#search_results").show();
     if(input.length >= 3){
          $.ajax({
               type : "POST",
               url : "../controller/get_vendor_edit.php?input="+input,
               beforeSend : function(){
                    $("#search_results").html("<p>Searching...</p>");
               },
               success : function(response){
                    $("#search_results").html(response);
               }
          })
     }
     
}
// update vendor details
function updateVendor(){
     let vendor_id = document.getElementById("vendor_id").value;
     let vendor = document.getElementById("vendor").value;
     let phone_number = document.getElementById("phone_number").value;
     let contact = document.getElementById("contact").value;
     let email = document.getElementById("email").value;
     if(vendor.length == 0 || vendor.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter vendor name!");
          $("#vendor").focus();
          return;
     }else if(phone_number.length == 0 || phone_number.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer phone number").focus();
          $("#phone_number").focus();
          return;
     
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/update_vendor.php",
               data : {vendor_id:vendor_id, vendor:vendor, phone_number:phone_number, email:email, contact:contact},
               beforeSend : function(){
                    $("#edit_customer").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $("#edit_customer").html(response);
               }
          })
     }
     setTimeout(function(){
          $("#edit_customer").load("edit_supplier_info.php #edit_customer");
     }, 1000);

     return false;    
}

 //pay debt
 function payDebt(invoice, customer, balance, amount_owed){
     if(parseFloat(amount_owed) > parseFloat(balance)){
          alert("Insufficient balance! Kindly fund customer wallet to continue");
          return;
     }else{
          let confirm_pay = confirm("Are you sure to complete this transaction?", "");
          if(confirm_pay){
               $.ajax({
                    type : "GET",
                    url : "../controller/pay_debt.php?receipt="+invoice+"&customer="+customer+"&amount_owed="+amount_owed,
                    beforeSend : function(){
                    $("#pay_debts").html("<div class='processing'><div class='loader'></div></div>");
               },
                    success : function(response){
                         $("#pay_debts").html(response);
                    }
               })
               setTimeout(() => {
                    $("#pay_debts").load("debt_payment.php?customer="+customer + "#pay_debts");
               }, 1500);
               return false;
          }else{
               return;
          }
     }
}

//reverse deposits
function reverseDeposit(deposit, customer){
     let confirm_reverse = confirm("Are you sure you want to reverse this transaction?", "");
     if(confirm_reverse){
          $.ajax({
               type : "GET",
               url : "../controller/reverse_deposit.php?deposit_id="+deposit+"&customer="+customer,
               beforeSend : function(){
                    $("#reverse_dep").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#reverse_dep").html(response);
               }
          })
          setTimeout(() => {
               $("#reverse_dep").load("reverse_deposit.php #reverse_dep");
          }, 1500);
          return false;
          
     }else{
          return;
     }
}
// Fund customer wallet via deposit 
function deposit(){
     let invoice = document.getElementById("invoice").value;
     let trans_date = document.getElementById("trans_date").value;
     let posted = document.getElementById("posted").value;
     let customer = document.getElementById("customer").value;
     let store = document.getElementById("store").value;
     let amount = document.getElementById("amount").value;
     let payment_mode = document.getElementById("payment_mode").value;
     let bank = document.getElementById("bank").value;
     let details = document.getElementById("details").value;
     let todayDate = new Date();
     if(payment_mode == "Transfer" || payment_mode == "POS"){
          if(bank.length == 0 || bank.replace(/^\s+|\s+$/g, "").length == 0){
               alert("Please select bank!");
               $("#bank").focus();
               return;
          }
     }
     if(payment_mode.length == 0 || payment_mode.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select payment_mode!");
          $("#exp_date").focus();
          return;
     }else if(amount.length == 0 || amount.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input transaction amount");
          $("#amount").focus();
          return;
     }else if(trans_date.length == 0 || trans_date.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please inpu transatctio date");
          $("#trans_date").focus();
          return;
     }else if(new Date(trans_date) > todayDate){
          alert("Transaction date cannot be futuristic");
          $("#trans_date").focus();
     }else if(amount <= 0){
          alert("Please input transaction amount");
          $("#amount").focus();
          return;
     }else if(details.length == 0 || details.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter description of transaction");
          $("#details").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/deposit.php",
               data : {posted:posted, customer:customer, payment_mode:payment_mode, amount:amount, details:details, store:store, invoice:invoice, bank:bank, trans_date:trans_date},
               beforeSend : function(){
                    $("#fund_account").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $("#fund_account").html(response);
               }
          })
     }
     return false;    
}

// prinit deposit receipt for fund wallet
function printDepositReceipt(invoice){
     window.open("../controller/deposit_receipt.php?receipt="+invoice);
     // alert(item_id);
     /* $.ajax({
          type : "GET",
          url : "../controller/sales_receipt.php?receipt="+invoice,
          success : function(response){
               $("#direct_sales").html(response);
          }
     }) */
     /* setTimeout(function(){
          $("#direct_sales").load("direct_sales.php #direct_sales");
     }, 100); */
     return false;
 
 }
 //get item to check history
function getHistoryItems(item_name){
     let item = item_name;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_history_items.php",
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}

//get item to change details
function getItemDetails(item_name, url){
     let item = item_name;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/"+url,
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}

//get item to delete
function getItemDelete(item_name){
     let item = item_name;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_item_to_delete.php",
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}

// print price tag
function printPriceTag(item){
     // alert(item_id);
     window.open("../controller/print_price_tag.php?item="+item);
     
     setTimeout(function(){
          $("#price_tag").load("print_price_tag.php #price_tag");
     }, 100);
     return false;
 
 }

 //get correct customer to merge files
function getCorCustomer(customer){
     let item = customer;
     // alert(check_room);
     // return;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_cor_customer.php",
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}
 //get correct item to merge
function getCorItem(item_name){
     let item = item_name;
     // alert(check_room);
     // return;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_cor_item.php",
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}

//add correct customer  for merging files
function addCorCustomer(id, name){
     let correct_customer = document.getElementById("correct_customer");
     let item = document.getElementById("item");
     correct_customer.value = id;
     item.value = name;
     // correct_customer.setAttribute('readonly', true);
     // item.setAttribute('readonly', true);
     $("#sales_item").html('');
}
//add correct item  for merging files
function addCorItem(id, name){
     let correct_item = document.getElementById("correct_item");
     let item = document.getElementById("item");
     correct_item.value = id;
     item.value = name;
     // correct_customer.setAttribute('readonly', true);
     // item.setAttribute('readonly', true);
     $("#sales_item").html('');
}
//get wrong customer to merge files
function getWrongCustomer(customer){
     let item_raw = customer;
     // alert(check_room);
     // return;
     if(item_raw.length >= 3){
          if(item_raw){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_wrong_customer.php",
                    data : {item_raw:item_raw},
                    beforeSend : function(){
                         $("#raw_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#raw_item").html(response);
                    }
               })
               return false;
          }else{
               $("#raw_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}
//get wrong item to merge
function getWrongItem(item_name){
     let item_raw = item_name;
     // alert(check_room);
     // return;
     if(item_raw.length >= 3){
          if(item_raw){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_wrong_item.php",
                    data : {item_raw:item_raw},
                    beforeSend : function(){
                         $("#raw_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#raw_item").html(response);
                    }
               })
               return false;
          }else{
               $("#raw_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}

//add wrong customer  for merging files
function addWrongCustomer(id, name){
     let wrong_customer = document.getElementById("wrong_customer");
     let item_raw = document.getElementById("item_raw");
     wrong_customer.value = id;
     item_raw.value = name;
     // correct_customer.setAttribute('readonly', true);
     // item.setAttribute('readonly', true);
     $("#raw_item").html('');
}
//add wrong item  for merging item
function addWrongItem(id, name){
     let wrong_item = document.getElementById("wrong_item");
     let item_raw = document.getElementById("item_raw");
     wrong_item.value = id;
     item_raw.value = name;
     // correct_customer.setAttribute('readonly', true);
     // item.setAttribute('readonly', true);
     $("#raw_item").html('');
}

//merge files
function mergeFiles(){
     let correct_customer = document.getElementById("correct_customer").value;
     let wrong_customer = document.getElementById("wrong_customer").value;
     if(correct_customer == wrong_customer){
          alert("You can not merge same customer");
          $("#item").focus();
          return;
     }else if(correct_customer.length == 0 || correct_customer.replace(/^\s+|\s+$/g, "").length == 0){
          alert("please select the correct customer");
          $("#correct_customer").focus();
          return;
     }else if(wrong_customer.length == 0 || wrong_customer.replace(/^\s+|\s+$/g, "").length == 0){
          alert("please select the wrong  customer name");
          $("#wrong_customer").focus();
          return;
     }else{
          let confirmMerge = confirm("Are you sure you want to merge these files?", "");
          if(confirmMerge){
               $.ajax({
                    type : "POST",
                    url : "../controller/merge_files.php",
                    data : {correct_customer:correct_customer, wrong_customer:wrong_customer},
                    beforeSend : function(){
                         $("#merge_files").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                        $("#merge_files").html(response); 
                    }
               })
               setTimeout(function(){
                    $("#merge_files").load("merge_files.php #merge_files");
               }, 1000);
               return false;
          }else{
               return;
          }
     }
}
//merge items
function mergeItems(){
     let correct_item = document.getElementById("correct_item").value;
     let wrong_item = document.getElementById("wrong_item").value;
     if(correct_item == wrong_item){
          alert("You can not merge same item");
          $("#item").focus();
          return;
     }else if(correct_item.length == 0 || correct_item.replace(/^\s+|\s+$/g, "").length == 0){
          alert("please select the correct item");
          $("#correct_item").focus();
          return;
     }else if(wrong_item.length == 0 || wrong_item.replace(/^\s+|\s+$/g, "").length == 0){
          alert("please select the wrong  item name");
          $("#wrong_item").focus();
          return;
     }else{
          let confirmMerge = confirm("Are you sure you want to merge these items?", "");
          if(confirmMerge){
               $.ajax({
                    type : "POST",
                    url : "../controller/merge_items.php",
                    data : {correct_item:correct_item, wrong_item:wrong_item},
                    beforeSend : function(){
                         $("#merge_files").html("<div class='processing'><div class='loader'></div></div>");
                    },
                    success : function(response){
                        $("#merge_files").html(response); 
                    }
               })
               setTimeout(function(){
                    $("#merge_files").load("merge_items.php #merge_files");
               }, 1000);
               return false;
          }else{
               return;
          }
     }
}

//update user role
function updateRole(){
     let user_id = document.getElementById("user_id").value;
     let user_role = document.getElementById("user_role").value;
     if(user_role.length == 0 || user_role.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please select role!");
          $("#user_role").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/change_role.php",
               data: {user_id:user_id, user_role:user_role},
               beforeSend : function(){
                    $("#staff_list").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#staff_list").html(response);
               }
          })
          setTimeout(function(){
               $("#staff_list").load("change_role.php #staff_list");
          }, 2000);
          return false
     }
 }

 //print end of day for current day
function printEndOfDay(){
     // alert(item_id);
     window.open("../controller/print_end_of_day.php");
 }
 //print end of day by date
function printEndOfDayByDate(from, to){
     // alert(item_id);
     window.open("../controller/print_end_of_day_date.php?from="+from+"&to="+to);
 }

 //get item to transfer to another item
function getItemsToTransfer(item_name){
     let item = item_name;
     // alert(check_room);
     // return;
     if(item.length >= 3){
          if(item){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_item_to_transfer.php",
                    data : {item:item},
                    beforeSend : function(){
                         $("#sales_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#sales_item").html(response);
                    }
               })
               return false;
          }else{
               $("#sales_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}
//add item to transfer to another item and display where to search for item to transfer into
function addItemToTransfer(id, name, qty){
     let item = document.getElementById("item");
     let transfer_qty_from = document.getElementById("transfer_qty_from");
     let item_name = name;
     let item_id = id;
     // alert(check_room);
     // return;
     if(qty <= 0){
          alert("Item does not have quantity! Cannot proceed");
          $("#item").focus();
          $("#item").val("");
          $("#sales_item").html("");
          return;
     }else{
          item.value = item_name;
          transfer_qty_from.value = item_id;
          $("#sales_item").html("");
     }
     
}
//get item to transfer into from another item
function getItemsToTransferTo(item_name){
     let item_to = item_name;
     if(item_to.length >= 3){
          if(item_to){
               $.ajax({
                    type : "POST",
                    url :"../controller/get_item_to_transfer_to.php",
                    data : {item_to:item_to},
                    beforeSend : function(){
                         $("#transfer_item").html("<p>Searching...</p>");
                    },
                    success : function(response){
                         $("#transfer_item").html(response);
                    }
               })
               return false;
          }else{
               $("#transfer_item").html("<p>Please enter atleast 3 letters</p>");
          }
     }
     
}
//add item to transfer into from another and display quantitities
function addItemToTransferTo(id, name){
     let transfer_qty_to = document.getElementById("transfer_qty_to");
     let item_to = document.getElementById("item_to");
     let item_name = name;
     let item_id = id;
     // alert(check_room);
     // return;
     
     transfer_qty_to.value = item_id;
     item_to.value = item_name;
     $("#transfer_item").html("");
     
     
}
function transferQty(){
     let transfer_qty_from = document.getElementById("transfer_qty_from").value;
     let transfer_qty_to = document.getElementById("transfer_qty_to").value;
     let remove_qty = document.getElementById("remove_qty").value;
     let add_qty = document.getElementById("add_qty").value;
     //authentification
     
     if(transfer_qty_from.length == 0 || transfer_qty_from.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item you want to transfer quantity from!");
          $("#item").focus();
          return;
     }else if(transfer_qty_to.length == 0 || transfer_qty_to.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input item you want to transfer quantity to!");
          $("#item_to").focus();
          return;
     }else if(transfer_qty_from == transfer_qty_to){
          alert("Alert! You cannot move quantity between same items!");
          $("#item_to").focus();
          return;
     }else if(remove_qty.length == 0 || remove_qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter quantity to remove!");
          $("#remove_qty").focus();
          return;
     }else if(add_qty.length == 0 || add_qty.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter quantity to add!");
          $("#add_qty").focus();
          return;
     }else if(parseFloat(remove_qty) <= 0 || parseFloat(add_qty) <= 0){
          alert("Quantity cannot be less than 0!");
          $("#add_qty").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/transfer_quantity.php",
               data : {transfer_qty_from:transfer_qty_from, transfer_qty_to:transfer_qty_to, remove_qty:remove_qty, add_qty:add_qty},
               beforeSend : function(){
                    $("#transfer_quantities").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#transfer_quantities").html(response);
               }
          })
          setTimeout(function(){
               $("#transfer_quantities").load("transfer_qty.php #transfer_quantities");
          }, 1500)
          return false;
     }
}

//generate random characters
function generateString(length) {
     // random characters
     const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
function isValidEmail(email) {
    // Basic regex pattern for most email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 //online payment for renewal of package with vpay
function renewPackage(){
     // event.preventDefault();
     let fee = document.getElementById("fee").value;
     let processing = document.getElementById("processing").value;
     let total_due = document.getElementById("total_due").value;
     let company = document.getElementById("company").value;
     let package = document.getElementById("package").value;
     let duration = document.getElementById("duration").value;
     let email_add = document.getElementById("email_add").value;
     let date = new Date();
     let year = date.getFullYear();
     let transNum = generateString(5)+company+year;
     // alert(transNum);
     
     if(email_add.length == 0 || email_add.replace(/^\s+|\s+$/g, "").length == 0){
         alert("Please input email address!");
         $("#email_add").focus();
         return;
     }else if (!isValidEmail(email_add)) {
          alert("Please enter a valid email address.");
          $("#email_add").focus();
          return;
     }else if (!package) {
          alert("Please select a package.");
          $("#package").focus();
          return;
     }else if (!duration) {
          alert("Please select package duration.");
          $("#duration").focus();
          return;
    
     }else{
         confirm_booking = confirm("Are you sure you want to continue with your payment", "");
         if(confirm_booking){
             const options = {
                 amount: fee,
                 currency: 'NGN',
                 domain: 'live',
                 key: 'c48a27aa-9cbc-416f-9793-099ad78f2fd5',
                 email: email_add,
                 transactionref: transNum,
                 customer_logo: 'https://www.dorthpro.com/company/images/logo.png',
                 customer_service_channel: '+2347068897068, support@dorthpro.com',
                 txn_charge: 3,
                 txn_charge_type: 'percentage',
                 onSuccess: function(response) { 
                     $.ajax({
                         type : "POST",
                         url : "../controller/renew_package.php",
                         data : {fee:fee, email_add:email_add, total_due:total_due, processing:processing, package:package, company:company, duration:duration,  transNum:transNum},
                     });
                     alert('Payment Successful!', response.message);
                     window.open("../view/users.php", "_parent");
                     return;
                 },
             onExit: function(response) { console.log('Hello World!',
         response.message); }
         }
         
         if(window.VPayDropin){
             const {open, exit} = VPayDropin.create(options);
             open();                    
         }
         }    
     }
 };

 //reverse expenses posted daily
function reverseXpense(expense){
     let confirm_reverse = confirm("Are you sure you want to reverse this transaction?", "");
     if(confirm_reverse){
          $.ajax({
               type : "GET",
               url : "../controller/reverse_expense.php?expense="+expense,
               beforeSend : function(){
                    $("#reverse_dep").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
                    $("#reverse_dep").html(response);
               }
          })
          setTimeout(() => {
               $("#reverse_dep").load("reverse_expense.php #reverse_dep");
          }, 1500);
          return false;
          
     }else{
          return;
     }
}

//select customer during sales
function selectCustomer(id, name){
     let customer_id = document.getElementById("customer_id");
     let customer = document.getElementById("customer");
     customer_id.value = id;
     customer.value = name;
     $("#search_results").html('');
}

//dislay add cusomer page during sales
function showAddCustomer(invoice){
     $.ajax({
          type : "GET",
          url : "../controller/add_sales_customer.php?invoice="+invoice,
          beforeSend : function(){
               $("#add_customer").html("<div class='processing'><div class='loader'></div></div>");
          },
          success : function(response){
               $("#add_customer").html(response)
          }
     })
}

// Add new customer during sales
function addSalesCustomer(){
     let customer = document.getElementById("customer").value;
     let phone_number = document.getElementById("phone_number").value;
     let address = document.getElementById("address").value;
     // let customer_store = document.getElementById("customer_store").value;
     let email = document.getElementById("email").value;
     let social_media = document.getElementById("social_media").value;
     if(customer.length == 0 || customer.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer name!");
          $("#customer").focus();
          return;
     }else if(phone_number.length == 0 || phone_number.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please enter customer phone number");
          $("#phone_number").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_new_sales_customer.php",
               data : {customer:customer, phone_number:phone_number, email:email, address:address, social_media:social_media /* customer_store:customer_store */},
               beforeSend : function(){
                    $("#add_cutomer").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $("#add_customer").html(response);
               }
          })
     }
     /* $("#customer").val('');
     $("#email").val('');
     $("#address").val('');
     $("#phone_number").val('');
     $("#customer").focus(); */
     return false;    
}

// global/script.js
document.addEventListener("input", function(e) {
    if (e.target && e.target.id === "searchRoom") {
        const q = e.target.value.trim().toLowerCase();
        const table = document.querySelector("#data_table");
        if (!table) return;
        const tbody = table.querySelector("tbody");
        let visibleCount = 0;

        tbody.querySelectorAll("tr").forEach(row => {
            const tds = row.querySelectorAll("td");
            const category = tds[1]?.textContent.toLowerCase() || "";
            const item = tds[2]?.textContent.toLowerCase() || "";
            if (category.includes(q) || item.includes(q) || q === "") {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }
        });

        // "no results" message
        let noMsg = document.querySelector(".no_result_message");
        if (visibleCount === 0) {
            if (!noMsg) {
                noMsg = document.createElement("p");
                noMsg.className = "no_result_message";
                noMsg.textContent = "No matching results found.";
                noMsg.style.textAlign = "center";
                noMsg.style.marginTop = "10px";
                table.parentElement.appendChild(noMsg);
            }
        } else if (noMsg) {
            noMsg.remove();
        }
    }
});

// add software packages
function addPackage(){
     let package = document.getElementById("package").value;
     let monthly = document.getElementById("monthly").value;
     let six_months = document.getElementById("six_months").value;
     let yearly = document.getElementById("yearly").value;
     if(package.length == 0 || package.replace(/^\s+|\s+$/g, "").length == 0){
          alert("Please input software package!");
          $("#package").focus();
          return;
     }else if(parseFloat(monthly) <= 0){
          alert("Monthly subscription must be greater than 0");
          $("#monthly").focus();
          return;
     }else if(parseFloat(six_months) < 0 || parseFloat(yearly) < 0){
          alert("Values Cannot be less than 0");
          $("#yearly").focus();
          return;
     }else{
          $.ajax({
               type : "POST",
               url : "../controller/add_package.php",
               data : {package:package, monthly:monthly, six_months:six_months, yearly:yearly},
               beforeSend: function(){
                    $(".info").html("<div class='processing'><div class='loader'></div></div>");
               },
               success : function(response){
               $(".info").html(response);
               }
          })
     }
     // $("#room_category").val('');
     $("#package").val('');
     $("#monthly").val('');
     $("#six_months").val('');
     $("#yearly").val('');
     $("#package").focus();
     return false;    
}

// get package details during renewals
function getPackageDetails(pack_id){
     let package = pack_id;
     if(package){
          $.ajax({
               type : "POST",
               url :"../controller/get_packages.php",
               data : {package:package},
               success : function(response){
                    $("#duration").html(response);
                    $("#to_pay").val(0);
                    $("#total_due").val(0);
                    $("#fee").val(0);
                    $("#processing").val(0);
               }
          })
          return false;
     }else{
          $("#sub_menu").html("<option value'' selected>No package available</option>")
     }
     
}
// get package fee during renewals
function getPackageFee(duration_id){
     let package = document.getElementById("package").value;
     let duration = duration_id;
     if(duration){
          $.ajax({
               type : "POST",
               url :"../controller/get_package_fee.php",
               data : {package:package, duration:duration},
               success : function(response){
                    $("#fees").html(response);
               }
          })
          return false;
     }else{
          $("#sub_menu").html("<option value'' selected>Select a package first</option>")
     }
     
}