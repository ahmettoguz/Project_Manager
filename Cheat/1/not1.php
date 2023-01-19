<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php
    // "dot" operator is used for concatenation.
    // if you want to use variable inside the text you must use "" for echo, '' is displaying string as iteself
    // \" is the escape character for echo if you want to use " inside the echo statement.
    // in show page source you may want to use \n for displaying properly.
    define("STARTDATE", "1/1/2015");
    const NAME = "Ahmo";
    $age = 21;
    $str = "ahmet " . "oguz " . "ergin" . "</br> Age is: $age";
    // echo "$str";
    // var_dump($str);

    $ran = random_int(0, 10);

    $date = new DateTime();
    // var_dump($date);

    // loops are similar with c language. No need to memorize. with intellisense you may complete for, foreach, array

    // ARRAY ----------------------------------------------------------------------------------
    // sequential, associative
    $ar = [0, 1, 2, 3];
    $ar[4] = 4;
    $ar[] = 5; // add to the end.
    count($ar); //gives size.
    // var_dump($ar);
    // echo join(" ", $ar); // another way to display array element rather than for or foreach loop

    $ar = array('name' => "ahmet", 'lastname' => "ergin");
    $ar["age"] = 24;
    // var_dump($ar);

    // arrays can be used nested
    $cars = [
        ["brand" => "renault", "model" => "megan", "year" => 2017],
        ["brand" => "citroen", "model" => "C3", "year" => 2015],
        ["brand" => "opel", "model" => "astra", "year" => 2011],
        ["brand" => "bmw", "model" => "3.18i", "year" => 2009]
    ];


    // built in functions
    $nums = range(0, 9);
    $nums = range(0, 9, 2);
    shuffle($nums);

    sort($nums);

    usort($users, function ($a, $b) {
        return $a["id"] <=> $b["id"];
    });

    // Add Items
    // adding new items in front of the array
    array_unshift($nums, 32, 30);

    // adding to the end of the array
    array_push($nums, 45, 46);  // as many items as you wish
    $nums[] = 47;  // only one item can be added.

    // Insert item(s) at a given index position
    array_splice($nums, 3, 0, [98, 99]);

    // Delete items
    // 1. Removing the first item
    $first = array_shift($nums);

    // 2. Removing the last item
    $last = array_pop($nums);

    // 3. Remove from any index number.
    array_splice($nums, 4, 3);


    // find in array
    in_array("searchValue", $nums);

    // search for index
    array_search(99, $nums);


    // extract gives key key as a variables
    $person = ["name" => "ali", "id" => 1234, "age" => 21];
    extract($person); // it creates variables using keys of assoc. array.
    // echo "<p>The name is $name and id is $id and age is $age</p>";

    // Variable variables
    $var = "city";
    $$var = "Ankara";  // creates $city since $var is "city"


    // STRINGS ----------------------------------------------------------------------------
    // explode
    $data = "name=ahmet&id=123&age=21";
    $pairs = explode("&", $data);

    // lenght
    $len = mb_strlen("Oğuz");

    // trim
    $trimmed = trim("****oğuz****", "*");

    // search for position
    $position = mb_stripos("ahmetğ oguz ergin", "oguz", 0, 'utf8');

    // searching count of that element
    substr_count($from, '/');

    // upper case lower case
    mb_strtoupper("ahmet");
    mb_strtolower("ERGIN");

    // check if letter
    ctype_alpha("asdf");

    // check if digit
    is_numeric("123");

    // 09AZaz comparison
    strcmp("A", "a");

    // substring
    $name = "ahmet oguz ergin";
    $substr = substr($name, 0, 1);
    $substr = substr($name, -1);


    // FUNCTIONS ---------------------------------------------------------
    // pass by value
    function sum($x, $y)
    {
        $z = $x + $y;
        return $z;
    }

    // pass by reference
    function change(&$x)
    {
        $x = 1;
    }
    change($x);

    // global usega of variable
    function useGlobal()
    {
        global $version;
        $version = 2.0;
    }

    // arguments
    function test($required, $optional = 0, ...$rest)
    {
        // echo "Reqired: " . $required . "<br>";
        // echo "Optional: " . $optional . "<br>";
        // var_dump($rest);
    }

    test(12);
    test(12, 15);
    test(12, 15, 45, 14, 25);

    // if you want to use function file and call from another file
    // create file with php in php tag write function
    //  in that file include with { include_once"./function.php";  include""; require""; require_once""; } 
    //  and than you can call it


    // you can insert page from another file its like iframe 
    // create some part of the page from another php file likes body footer nav 
    // and you can insert them with again include and requires

    // IMPORTANT NOTES -------------------------------------------------------------------------
    // direct to another page
    // header("Location:b.php");

    // var_dump($_SERVER["REQUEST_METHOD"])  //gives get or post
    // var_dump($_SERVER)

    // query string
    // file name {basename(__FILE__)} ?name=ahmet&surname=ergin
    // <a href="?name=ahmet&surname=ergin"></a>
    // in file you may check it before echo if there is no passed argument
    // if(isset($_GET["name"]))
    // $name = isset($_GET["name"]) ? $_GET["name"] : "";
    // and empty could be used
    // if(empty($name))
    // extract($_GET) gives all the query string as seperated variables.
    // <a href='a.php?name[]=ahmo&name[]=mahmo'>direct</a>"; // send as an array

    // $ar1 = [1, 2, 3];
    // $ar2 = ["a", "b", "c"];
    // $ar = array(0 => $ar1, 1 => $ar2);
    // $link = http_build_query($ar);
    // parse_str($_GET["array"], $output);
    // $url = parse_url($urlString);
    // urlencode()
    // urldecode()


    // FORM----------------------------------------------------------------------------------------
    // with form you can direct another page or same page with arguments
    // if there is password you should use post and you can use get for any other cases
    //     <form action="?directedPage.php" method="POST">
    //     <!-- text -->
    //     <input type="text" name="username">
    //     <input type="password" name="password">

    //     <!-- selection -->
    //     <select name="colors" id="">
    //         <option value="0">red</option>
    //         <option value="1">green</option>
    //     </select>

    //     <!-- checkbox -->
    //     <input type="checkbox" name="colors[]" value="0">
    //     <input type="checkbox" name="colors[]" value="1">

    //     <!-- radiobutton -->
    //     <input type="radio" name="radioGroup1" value="0">
    //     <input type="radio" name="radioGroup1" value="1">


    //     <!-- button for submit -->
    //     <input type="submit" name="submitBtn" value="submitted">
    // </form>

    ?>

</body>

</html>