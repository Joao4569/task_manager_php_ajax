<?php
$server = "localhost";
$user_name = "task_manager";
$password = "TaskManager1234";
$database = "task_manager_vanguard_php";
$port = 3307;

$connection = mysqli_connect($server, $user_name, $password, $database, $port);

$result = mysqli_query($connection, "SELECT * FROM tasks");

$tasks = array();

while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
}

echo json_encode($tasks);
