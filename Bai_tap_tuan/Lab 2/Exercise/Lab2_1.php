<html>
    <head>
        <title>
            This is a form
        </title>
    </head>
    <body>
        <form action="Lab2_1_handle.php" method="post">
        <table>
            <tr>
                <td>Name:</td>
                <td><input type="text" name="name"></td>
            </tr>
            <tr>
                <td>University:</td>
                <td><input type="text" name="university"></td>
            </tr>
            <tr>
                <td>Class:</td>
                <td><input type="text" name="class">
            </tr>
        </table>
            Gender:<br>
            <input type="radio" name="gender" value="female">
            <label for="female">Female</label><br>
            <input type="radio" name="gender" value="male">
            <label for="male">Male</label><br>
            <input type="radio" name="gender" value="other">
            <label for="other">Other</label><br>
            Hobby:<br>
            <input type="checkbox" name="hobby1" value="manga">
            <label for="hobby1">Manga</label><br>
            <input type="checkbox" name="hobby2" value="anime">
            <label for="hobby2">Anime</label><br>
            <input type="checkbox" name="hobby3" value="kpop">
            <label for="hobby3">Kpop</label><br>
            <br>
            <input type="submit">
        </form>
    </body>

</html>