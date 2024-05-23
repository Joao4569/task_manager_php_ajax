<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $task_id = $_POST["task_id"];

    try {
        require_once "db_connection.php";

        
        $query = "DELETE FROM tasks WHERE id = '$task_id'";

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
