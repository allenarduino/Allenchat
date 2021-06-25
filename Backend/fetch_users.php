<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('db.php');


require "vendor/autoload.php";
use \Firebase\JWT\JWT;
$key="xxxxxxxxkkkkkkllllllll";


function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { 
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

/**Get token from header** */

function getBearerToken() {
$headers = getAuthorizationHeader();
// HEADER: Get the access token from the header
if (!empty($headers)) {
    if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
        return $matches[1];
    }
}
return null;
}


$token=getBearerToken();



$decoded_token=JWT::decode($token,$key,array('HS256'));
$user_id=json_decode($decoded_token);




$sql="SELECT* FROM users WHERE NOT user_id ={$user_id}  ORDER BY user_id";
$result=mysqli_query($db,$sql);
$count=mysqli_num_rows($result);
if($count>0){
    
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($row,JSON_NUMERIC_CHECK);
}
?>



