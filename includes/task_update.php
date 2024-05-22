<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $date = $_POST["date"];
    $task_id = $_POST["task_id"];
    $completed = $_POST["completed"];

    try {
        require_once "db_connection.php";

        
        $query = "UPDATE tasks SET title = '$title', due_date = '$date', completed = '$completed' WHERE id = '$task_id'";

        mysqli_query($connection, $query);

        mysqli_close($connection);

        header("Location: ../index.php");

        die();
        
    } catch (Exception $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}