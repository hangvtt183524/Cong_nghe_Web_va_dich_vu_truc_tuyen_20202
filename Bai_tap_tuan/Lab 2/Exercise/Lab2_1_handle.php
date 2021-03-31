<html>
    <head>
        <title>
            Form Handling
        </title>
    </head>
    <body>
        Hello <?php echo $_POST["name"]?><br><br>
        You are a student from <?php echo $_POST["university"]?>, class <?php echo $_POST["class"]?><br><br>
        Your gender is <?php echo $_POST["gender"]?><br><br>
        Your hobbies are:
        <?php
            echo "<ol>";
            if(!empty($_POST["hobby1"])) echo "<li>"."Manga"."<br>";
            if(!empty($_POST["hobby2"])) echo "<li>"."Anime"."<br>";
            if(!empty($_POST["hobby3"])) echo "<li>"."Kpop"."<br>";
            echo "</ol>";
        ?>

    </body>
</html>