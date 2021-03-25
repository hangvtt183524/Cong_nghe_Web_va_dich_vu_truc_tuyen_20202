<html>
<!-- hello.php CS443 -->
<head><title>Hello World</title></head>
<body>
<p>BASIC PHP SYNTAX</p>
 <p>This is going to be ignored by the PHP interpreter.</p>

   <?php echo '<p>While this is going to be parsed.</p>'; ?>

  <p>This will also be ignored by the PHP preprocessor.</p>

   <?php print('<p>Hello and welcome to <i>my</i> page!</p>');   
    ?>

  <?php

   //This is a comment

  /*
   This is
   a comment
   block
  */
  ?>
<hr>


<p>SCALARS</p>
<p>
<?php
$foo = true; if ($foo) echo "It is TRUE! <br /> \n";
$txt='1234'; echo "$txt <br /> \n";
$a = 1234; echo "$a <br /> \n";
$a = -123; 
echo "$a <br /> \n";
$a = 1.234; 
echo "$a <br /> \n";
$a = 1.2e3; 
echo "$a <br /> \n";
$a = 7E-10; 
echo "$a <br /> \n";
echo 'Arnold once said: "I\'ll be back"', "<br /> \n";
$beer = 'Heineken'; 
echo "$beer's taste is great <br /> \n";
$str = <<<EOD
Example of string
spanning multiple lines
using “heredoc” syntax.
EOD;
echo $str;
?>  
</p>
<hr>


<ARRAYS>
<?php
$arr = array("foo" => "bar", 12 => true);
echo $arr["foo"]; // bar
echo $arr[12];    // 1
?>


<?php
array(5 => 43, 32, 56, "b" => 12);
array(5 => 43, 6 => 32, 7 => 56, "b" => 12);
?>


<?php
$arr = array(5 => 1, 12 => 2);
foreach ($arr as $key => $value) { echo $key, '=>', value);  }
$arr[] = 56;    // the same as $arr[13] = 56;
$arr["x"] = 42; // adds a new element
unset($arr[5]); // removes the element
unset($arr);    // deletes the whole array
$a = array(1 => 'one', 2 => 'two', 3 => 'three');
unset($a[2]);
$b = array_values($a);
?>
<hr>


<p>CONSTANTS</P>
<?php

// Valid constant names
define("FOO",    "something");
define("FOO2",    "something else");
define("FOO_BAR", "something more");

// Invalid constant names  (they shouldn’t start
//      with a number!)

define("2FOO",    "something");

// This is valid, but should be avoided:
// PHP may one day provide a "magical" constant
// that will break your script

define("__FOO__", "something"); 

?>
<hr>


<p>CONDITIONALS: IF ELSE</p>
<?php
$d=date("D");
echo $d, "<br/>";
if ($d=="Fri")
     echo "Have a nice weekend! <br/>"; 
else
     echo "Have a nice day! <br/>"; 

$x=10;
if ($x==10)
{
     echo "Hello<br />"; 
     echo "Good morning<br />";
}

?>
<hr>


<p>CONDITIONALS: SWITCH</p>
<?php
$x = rand(1,5);  // random integer
echo "x = $x <br/><br/>";
switch ($x)
{
case 1:
  echo "Number 1";
  break;
case 2:
  echo "Number 2";
  break;
case 3:
  echo "Number 3";
  break;
default:
  echo "No number between 1 and 3";
  break;
}
?>
<hr>


<p>LOOPING: WHILE AND DO-WHILE</p>
<?php 
$i=1;
while($i <= 5)
{
  echo "The number is $i <br />";
  $i++;
}
?>

<?php 
$i=0;
do
{
  $i++;
  echo "The number is $i <br />";
}
while($i <= 10);
?>
<hr>


<p>LOOPING: FOR AND FOREACH
<?php
for ($i=1; $i<=5; $i++)
{
echo "Hello World!<br />";
}
?>

<?php
$a_array = array(1, 2, 3, 4);
foreach ($a_array as $value) 
{
   $value = $value * 2;
   echo "$value <br/> \n";
}
?>

<?php 
$a_array=array("a","b","c");
foreach ($a_array as $key => $value)
{
  echo $key . " = " . $value . "\n";
}
?>
<hr>


<p>USER DEFINED FUNCTIONS</p>
<?php
function foo($arg_1, $arg_2, /* ..., */ $arg_n)
{
   echo "Example function.\n";
   return $retval;
}
?>

<?php
function square($num)
{
   return $num * $num;
}
echo square(4);
?>

<?php
function small_numbers()
{
   return array (0, 1, 2);
}
list ($zero, $one, $two) = small_numbers();
echo $zero, $one, $two;
?>

<?php
function takes_array($input)
{
   echo "$input[0] + $input[1] = ", $input[0]+$input[1];
}
 takes_array(array(1,2));
?>
<hr>

</body>
</html> 
