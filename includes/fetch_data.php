<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    try {
        require_once "db_connection.php";

        $result = mysqli_query($connection, "SELECT * FROM tasks ORDER BY due_date ASC");

        $tasks = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $tasks[] = $row;
        }

        echo json_encode($tasks);
        
    } catch (Exception $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}

