<html>
	<head>
		<title>DateTime Processing</title>
	</head>
	<body>
		Enter your name and select date and time for the appointment
		<br>
		<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="GET">
			<?php 
			if (array_key_exists("day", $_GET)) {
			    $day = $_GET["day"];
			    $month = $_GET["month"];
			    $year = $_GET["year"];
			    $hour = $_GET["hour"];
			    $minute = $_GET["minute"];
			    $second = $_GET["second"];
			}
			else {
			    $day = 1;
			    $month = 1;
			    $year = 1900;
			    $hour = 0;
			    $minute = 0;
			    $second = 0;
			}
			?>
			<table>
				<tr>
					<td>Your name: </td>
					<td><input type="text" size="10" maxlength="15" name="name" value="<?php if (isset($_GET["name"])) echo $_GET["name"]; ?>"></td>
					<?php 
// 					if (isset($_GET["name"])) {
// 					    echo "Hi ".$_GET["name"]."!<br>";
// 					}
// 					?>
				</tr>
				<tr>
					<td>Date: </td>
					<td>
						<select name="day">
						<?php 
						for ($i=1; $i<=31; $i++) {
						    if ($i==$day) 
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
						<select name="month">
						<?php 
						for ($i=1; $i<=12; $i++) {
						    if ($i==$month)
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
						<select name="year">
						<?php 
						for ($i=1900; $i<=2200; $i++) {
						    if ($i==$year)
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
					</td>
				</tr>
				<tr>
					<td>Time: </td>
					<td>
						<select name="hour">
						<?php 
						for ($i=0; $i<=23; $i++) {
						    if ($hour == $i)
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
						<select name="minute">
						<?php 
						for ($i=0; $i<=59; $i++) {
						    if ($minute == $i)
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
						<select name="second">
						<?php 
						for ($i=0; $i<=59; $i++) {
						    if ($second == $i)
						        print("<option selected>$i</option>");
						    else print("<option>$i</option>");
						}
						?>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right"><input type="submit" value="Submit"></td>
					<td align="left"><input type="reset" value="Reset"></td>
				</tr>
			</table>
			<?php 
			if (isset($_GET["name"])) {
			    echo "Hi ".$_GET["name"]."!<br>";
			}
			$d = 1;
			if (array_key_exists("day", $_GET)) {
			    switch ($month) {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						$d=31; break;	
			        case 4: 
			        case 6:
			        case 9:
			        case 11: 
			            if ($day > 30) {
			                echo "<br>Invalid date! Please choose again!"; exit();
			            }
			            else $d = 30; break;
			        case 2:
			            if($day > 29){
			                echo "<br>Invalid date! Please choose again!"; exit();
			            }
			            if ($year % 400 == 0 || ($year % 4 == 0 && $year % 100 != 0)) {
			                $d = 29; break;
			            }
						else {
						    if ($day > 28){
						        echo "<br>Invalid date! Please choose again!"; exit();
						    }
							else $d=28;
								
						}
			    }
				echo "You have chosen to have an appointment on ".$hour.":".$minute.":".$second.", ".$day."/".$month."/".$year."<br>";
				echo "<br>More information<br>";
				echo "<br>In 12 hours, the time and date is ";
				if ($hour>12)
					echo ($hour-12).":".$minute.":".$second." PM, ";
					else echo $hour.":".$minute.":".$second." AM, ";
					echo $day."/".$month."/".$year."<br>";
					echo "<br>This month has ".$d." days!";    
			}
			
			?>
		</form>
	</body>
</html>