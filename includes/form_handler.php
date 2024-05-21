<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $date = $_POST["date"];

    try {
        require_once "db_connection.php";

        $query = "INSERT INTO tasks (title, due_date) VALUES ('$title', '$date')";

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
