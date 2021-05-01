<html>
    <head>
        <title>Business Registration</title>
        

    </head>
    <style>
        .big {
            display: grid;
            grid-template-columns: repeat(2,1fr  1fr);
        }
    </style>
    <body>
        <h1>Business Registration</h1>
        <form action="" method="POST">
            <div class="big">
                <div class="small1">
                    Click on one or control click <br> on multiple categories <br><br>
                    <?php
                        $conn = mysqli_connect("localhost", "root", "", "business_service");
                        // Check connection
                        if ($conn->connect_error) {
                            die("Connection failed: " . $conn->connect_error);
                        }
                        $sql = "SELECT * FROM categories";
                        $result = $conn->query($sql);
                    
                    ?>
                    <select name = "categories[]" multiple size="<?php $result->num_rows ?>">
                    <?php while($row = $result->fetch_assoc()):;?>
                        <option><?php echo $row["title"] ?></option>
                        <?php endwhile ?>
                    </select>
                </div>
                <div class="small2">
                    <table>
                        <tr>
                        <td>Business ID:</td>
                        <td><input type="text" name="id" required></td>
                        </tr>
                        <tr>
                            <td>Business Name:</td>
                            <td><input type="text" name="name" required></td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td><input type="text" name="addr" required></td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td><input type="text" name="city" required></td>
                        </tr>
                        <tr>
                            <td>Telephone:</td>
                            <td><input type="number" name="tele" required></td>
                        </tr>
                        <tr>
                            <td>URL:</td>
                            <td><input type="text" name="url" required></td>
                        </tr>
                    </table>
                    
                </div>

            </div>
            <input type="submit" name="submit">
            <?php 
                if(isset($_POST["submit"])){
                    if(isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["addr"]) && isset($_POST["city"]) && isset($_POST["tele"]) && isset($_POST["url"])){
                        $id = $_POST["id"];
                        $name = $_POST["name"];
                        $addr = $_POST["addr"];
                        $city = $_POST["city"];
                        $tele = $_POST["tele"];
                        $url = $_POST["url"];
                        $sqll = "insert into business (businessid, name, address, city, telephone, url) values ('$id', '$name', '$addr', '$city', '$tele', '$url')";
                        if(!mysqli_query($conn, $sqll)){
                            echo("Error description: " . mysqli_error($conn));
                        }
                        foreach ($_POST['categories'] as $selected){  
                            $sql2 = "select cateid from categories where title = '$selected'";
                            $tmp = $conn->query($sql2);
                            $tmp1 = $tmp->fetch_assoc();
                            $tmp2 = $tmp1["cateid"];
                            $sql1 = "insert into biz_categories (businessid, cateid) values ('$id', '$tmp2')";
                            if(!mysqli_query($conn, $sql1)){
                                echo("Error description: " . mysqli_error($conn));
                            } 
                        }
                        
                    }
                    $conn->close();
                }
                
            ?>
        </form>
    </body>
</html>