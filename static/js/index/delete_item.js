import { buildList } from "./build_list.js";

// Function to delete item from list
export function deleteItem(task) {

    // Set URL for API
    let url = "includes/task_delete.php";
  
    // Get task ID
    let task_id = task.id;
  
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
  
    // Send request with task_id
    xhr.send(`task_id=${task_id}`);
  }