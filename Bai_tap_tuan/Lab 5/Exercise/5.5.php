<!DOCTYPE html>
<html>
<head>
<title>Table with database</title>
<style>
    table {
        width: 50%;
        text-align: center;
        border: 1px solid;
}
    td, tr, th {
        border: 1px solid;
}
</style>
</head>
    <body>
        <h1>Category Administration page</h1>
        <form action="" method="POST">
        <table>
            <tr>
                <th>CategoriesID</th>
                <th>Title</th>
                 <th>Description</th>
             </tr>
        <?php
        $conn = mysqli_connect("localhost", "root", "", "business_service");
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "SELECT * FROM categories";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
        // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row["cateid"]. "</td><td>" . $row["title"] . "</td><td>"
                . $row["descr"]. "</td></tr>";
            }
        }
        else {
            echo "<h2> No data to show! Please insert</h2>";
        }
        
        ?>
        
        <tr>
            <td><input type="text" name="cateid"></td>
            <td><input type="text" name="title"></td>
            <td><input type="text" name="descr"></td>
        </tr>
        </table>
        <br>
        <button><input type="submit"></button>

        <?php

            if(isset($_POST['cateid']) && isset($_POST['title']) && isset($_POST['descr'])){
            $cateid = $_POST["cateid"];
            $title = $_POST["title"];
            $descr = $_POST["descr"];
            
            $sqll = "insert into categories (cateid, title, descr) values ('$cateid', '$title', '$descr')";
            
            if(mysqli_query($conn, $sqll)){
                echo "Refresh page to get new table with new insert";
            }
            $conn->close();
            }
            else{
                $conn->close();
            }
        ?>
        </form>
    </body>
</html>