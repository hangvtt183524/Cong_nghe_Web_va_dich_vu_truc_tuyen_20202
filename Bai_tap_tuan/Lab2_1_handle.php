<!DOCTYPE html>
<html>
<head><title>Title handling Lab2.1.html</title></head>
<body>
    Hello <?php echo $_POST["name"]; ?> <br>
    I am <?php echo $_POST["age"] ; ?> years old<br>
    My gender is <?php echo $_POST["gender"]; ?> <br>
    I am studying at <?php echo $_POST["university"]; ?> <br>
    My hobbies are:
    <br> <ol>
    <?php for($x=0; $x<4; $x++){
        if(isset($_POST["hobby"])) echo "<li>".$_POST["hobby"]."</li>";
        
    }
    ?></ol>
    
</body>
</html>
