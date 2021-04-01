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
						for ($i=1900; $i<=2010; $i++) {
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
			$a=1;
			if (array_key_exists("day", $_GET)) {
			    switch ($month) {
					case 1:
						$d=31; break;
					case 3:
						$d=31; break;
					case 5:
						$d=31; break;
					case 7:
						$d=31; break;
					case 8:
						$d=31; break;
					case 10:
						$d=31; break;
					case 12:
						$d=31; break;	
			        case 4: 
						if ($day > 30) {
 
							$a=0;
							break;
			            }
			            else{
							$d=30;
							break;
						}
			        case 6:
						if ($day > 30) {
			                
							$a=0;
							break;
			            }
			            else{
							$d=30;
							break;
						}
			        case 9:
						if ($day > 30) {
							$a=0;
							break;
			            }
			            else{
							$d=30;
							break;
						}
			        case 11: 
			            if ($day > 30) {
							$a=0;
							break;
			            }
			            else{
							$d=30;
							break;
						}
			        case 2:
			            if ($year % 400 == 0 || ($year % 4 == 0 && $year % 100 != 0)) {
			                if ($day > 29) {
								$a=0;
								break;
			                }
			                else{
								$d=29;
								break;
							}
			            }
						else{
							if($day > 28){
								$a=0;
								break;
							}
							else{
								$d=28;
								break;
							}
						}
			    }
				if($a==1){
				echo "You have chosen to have an appointment on ".$hour.":".$minute.":".$second.", ".$day."/".$month."/".$year."<br>";
				echo "<br>More information<br>";
				echo "<br>In 12 hours, the time and date is ";
				
					if ($hour>12)
						echo ($hour-12).":".$minute.":".$second." PM, ";
					else echo $hour.":".$minute.":".$second." AM, ";
					echo $day."/".$month."/".$year."<br>";
					echo "<br>This month has ".$d." days!"; 
				}
				else echo "<br>Invalid date! Please choose again!"; 
			}
// 			
// 			
			
			?>
		</form>
	</body>
</html>