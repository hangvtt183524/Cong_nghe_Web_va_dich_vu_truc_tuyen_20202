<html>
    <head>
        <title>Business Listing</title>
        
        <style>
            .total {
                display: grid;
                grid-template-columns: 0.5fr 2fr;
               
            }
            table {
                border: 1px solid;
                text-align: center;
                width: 50%;
            }
            th, tr, td {
                border: 1px solid;
            }
        
        </style>
    </head>
    <body>
        <h1>Business Listing</h1>
        <form action="" method="POST">
            <div class="total">
                <div class="left">
                    <p>Select category to see business listing</p>
                    <?php
                        $conn = mysqli_connect("localhost", "root", "", "business_service");
                        // Check connection
                        if ($conn->connect_error) {
                            die("Connection failed: " . $conn->connect_error);
                        }
                        $sql = "select title from categories";
                        $result = $conn->query($sql);
                    ?>
                    <select name="category" required>
                        <?php
                            if ($result->num_rows > 0) {
                                // output data of each row
                                    while($row = $result->fetch_assoc()) {
                                        echo "<option>" . $row["title"] . "</option>";
                                    }
                                }
                        ?>
                    </select>
                    <input type="submit" name ="submit" value="ok">

                </div>
                <div class="right">
                    <table>
                        <tr>
                            <th>Business ID</th>
                            <th>Business name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Telephone</th>
                            <th>URL</th>
                        </tr>
                        <?php
                            if(isset($_POST['submit'])){
                                $category = $_POST['category'];
                                $sqll = "select cateid from categories where title = '$category'";
                                $tmp = $conn->query($sqll);
                                $tmp1 = $tmp->fetch_assoc();
                                $tmp2 = $tmp1["cateid"];

                                $sqlll = "select businessid from biz_categories where cateid = '$tmp2'";
                                $tmp3 = $conn->query($sqlll);
                                if($tmp3->num_rows > 0){
                                    while($row = $tmp3->fetch_assoc()){
                                        $bid = $row["businessid"];
                                        $sql = "select * from business where businessid = '$bid'";
                                        $tmp4 = $conn->query($sql);
                                        
                                        
                                        if($tmp4->num_rows > 0){
                                            while($row = $tmp4->fetch_assoc()){
                                            echo "<tr><td>" . $row["businessid"]. "</td><td>" . $row["name"] . "</td><td>"
                                            . $row["address"]. "</td><td>" . $row["city"]. "</td><td>" . $row["telephone"]. "</td><td>" . $row["url"]. "</td></tr>";
    
                                        }
                                        }
                                    }
                                }
                                else{
                                    echo "There no info about businesses in this category";
                                }

                              
                            }
                            $conn ->close();
                        ?>
                    </table>
                </div>
            </div>
        </form>

    </body>
</html>