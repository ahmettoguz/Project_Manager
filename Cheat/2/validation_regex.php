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
    // VALIDATION FORM ******************************************************************
    // after form operation you should validate the data for security purposes
    // js could validate form but, js could be disabled from web borwser so that server side is required
    // for example you may get the messsage from text input and want to display to user back
    // you should avoid html injection. Because there could be attack with JS

    // String validation
    // while displaying the message you should use:
    // it will not execute js
    // <input type="text" name="numPerson" size="13" value="<?= isset($num) ? filter_var($num, FILTER_SANITIZE_FULL_SPECIAL_CHARS) : "" questionMark>">

    // if (filter_var($str, FILTER_SANITIZE_STRING) === false)

    // Number validation
    // $options = array('options' => array('min_range' => 0, 'max_range => 10'));
    // if (filter_var($age, FILTER_VALIDATE_INT) === false)
    // if (filter_var($age, FILTER_VALIDATE_INT, $options) === false)
    // if (filter_var($age, FILTER_VALIDATE_FLOAT, $options) === false)

    // === is used because 0, "", [] return false


    // REGULAR EXPRESSION ********************************************************************
    // checking characters in string

    // /regexExpression/flags
    // flags: 
    //      i -> case insensitive
    //      m -> multiline
    //      u -> unicode

    // return 0 1


    // checks if 7 is included
    // preg_match('/7/', $id)

    // for special character you must use escape character
    // preg_match('/ \n /', $id)

    // preg_match('/ \.\.\. /', $id) -> ...
    // preg_match('/ ... /', $id) -> 3 any character
    // preg_match('/ a...t /', $id) -> a123t , ahmet

    // [] - ^ 
    // preg_match('/ [0-9] /', $id) -> one digit
    // preg_match('/ [^0-9] /', $id) -> not include one digit

    // preg_match('/ [a-zA-Z] /', $id) -> one character
    // preg_match('/ [^a-zA-Z] /', $id) -> not one character


    // preg_match('/ [a-zA-Z0-9_] /', $id) ->one word char
    // preg_match('/ \w /', $id) -> one word char     for not \W


    // preg_match('/[ \t\n]/', $id) -> any blank char
    // preg_match('/\s/', $id) -> any blank char     for not \S

    // preg_match('/ \d\dahmet\d\d /i', $id) -> 24AHMET24, 99ahmet00


    // preg_match('/ \bahmo\b /', $id) -> 123 ahmo 123     false -> 2ahmo    \b is boundry


    // preg_match('/\.jpg$/', $id) end with .jpg


    // ? means optional
    // preg_match('/\d?/', $str) it means there could be digit or not 

    // checks if there is digit
    // preg_match('/\d/', $id)

    // {1} -> 1 times
    // {1,4} -> min 1 times max 4 times
    // {1,} -> min 1 times max infinite
    // {,4} -> optional to 4

    // +  -> 1 to infinite

    // preg_match('/ \d+ /', $id) 1   112312312312 

    // *  -> 0 to infinite


    // checks if there is 7 digits
    // preg_match('/\d{7}/', $id)

    // checks if there start and 7 digit and end
    // preg_match('/^\d{7}$/', $id)

    // check if there any one to three characters and not blank in it
    // preg_match('/^\S{1,3}$/', $password)

    // grouping with capture and not 
    // preg_match('/^(\d\d)$/', $num) 2 digit also I capture so that ı can use that pattern again
    // preg_match('/^(\d\d) \1$/', $num) 24 24 pattern should be same!

    // preg_match('/^(?:\d\d) \1$/', $num) if you use ?: in grouping you not capture that group 
    // so that you cannot use it again with \1

    // preg_match('/^(?:cat|dog)eat(meat|fist)\1$/', $num) if you use ?: in grouping you can use or 
    // preg_match('/^(?:cat|dog) eat (meat|fist)\1$/', $num) cat eat meat meat | dog eat meat meat


    // MATCH ALL ---------------------
    // preg_match_all('expression','text',$array)
    // result will be in $array it is 2 dim array 0 row keep all match  

    // if there is group match it will stored in grouped index 
    // preg_match_all('/(\d\d)a/', '24ahmet', $ar);
    // echo "{$ar[0][0]}"; 24a
    // echo "{$ar[1][0]}"; 24

    // preg_match_all('/(\w+)@hotmail/', 'ahmet@hotmail.com tuna@hotmail.edu.tr', $ar);
    // echo "{$ar[0][0]} "; ahmet@hotmail 
    // echo "{$ar[0][1]} "; tuna@hotmail 
    // echo "{$ar[1][0]} "; ahmet 
    // echo "{$ar[1][1]} "; tuna


    // REPLACE ------------
    // $modified = preg_replace('/pattern/', 'replaced pattern', 'text');
    // $modified = preg_replace('/like/', 'hate', 'ahmo like that life');
    // echo("$modified"); ahmo hate that life

    // also you may use group for output
    // $modified = preg_replace('/(\w+ +)(\w)(\w+)$/iu', '-\1- -\2- -\3-', 'Ahmet Oguz Ergin');
    // echo "$modified";

    ?>
</body>

</html>