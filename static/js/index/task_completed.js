import { buildList } from "./build_list.js";

// Task completed function
export function taskCompleted(task) {
    // Set URL for API
    let url = "includes/task_update.php";
  
    let title = task.title;
    let date = task.due_date;
    let task_id = task.id;
    let completed = task.completed === "1" ? "0" : "1";
  
    let xhr = new XMLHttpRequest();
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        buildList();
      }
    };
  
    xhr.send(
      `title=${title}&date=${date}&task_id=${task_id}&completed=${completed}`
    );
  }