import { buildList } from "./build_list.js";

// Function to delete item from list
export function deleteItem(task) {
    // Set URL for API
    let url = "includes/task_delete.php";
  
    let task_id = task.id;
  
    let xhr = new XMLHttpRequest();
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        buildList();
      }
    };
  
    xhr.send(`task_id=${task_id}`);
  }