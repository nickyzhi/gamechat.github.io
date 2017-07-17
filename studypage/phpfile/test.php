

<?php

$a = $_POST['resultAsString'];


    $f = fopen("try.json", "a") or die("fopen failed");
    fwrite($f, "\n");
    fwrite($f, $a);
    fclose($f);
   

?>