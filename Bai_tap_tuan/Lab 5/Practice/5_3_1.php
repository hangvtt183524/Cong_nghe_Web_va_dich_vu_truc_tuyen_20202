<html><head><title>Create Table</title></head><body>
<?php
$table_name = 'product';
$mydb = 'business_service';
$conn = mysqli_connect("localhost", "root", "", "business_service");
if (!$conn) {
     die ("Cannot connect to server");
} else {
     $SQLcmd = "CREATE TABLE $table_name(
               ProductID INT UNSIGNED NOT NULL
			          AUTO_INCREMENT PRIMARY KEY,
               Product_desc VARCHAR(50),
               Cost INT, 
               Weight INT, 
               Numb INT)";
    
     if (mysqli_query($conn, $SQLcmd)){
          print '<font size="4" color="blue" >Created Table';
          print "<i>$table_name</i> in database<i>$mydb</i><br></font>"; 
          print "<br>SQLcmd=$SQLcmd";
     } else {
          echo("Error description: " . mysqli_error($conn));
     } 
     mysqli_close($conn);
}     
?>
 </body>
 </html> 
