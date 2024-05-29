import { buildList } from "./build_list.js";

// Task completed function
export function taskCompleted(task) {
    // Set URL for API
    let url = "includes/task_update.php";
  
    // Get task details
    let title = task.title;
    let date = task.due_date;
    let task_id = task.id;
    let completed = task.completed === "1" ? "0" : "1";
  
    // Initialize a new XMLHttpRequest() object
    let xhr = new XMLHttpRequest();
  
    // Open a new connection, using the POST request on the URL endpoint
    xhr.open("POST", url, true);

    // Set request header
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Handle response to request
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            buildList();
        }
    };
  
    // Send request with task details
    xhr.send(
        `title=${title}&date=${date}&task_id=${task_id}&completed=${completed}`
    );
  }