<?php

$server = "localhost";
$user_name = "task_manager";
$password = "TaskManager1234";
$database = "task_manager_vanguard_php";
$port = 3307;

$connection = mysqli_connect($server, $user_name, $password, $database, $port);
