import { handleList } from "./handle_list.js";
import { addTaskEventListeners } from "./add_task_event_listeners.js";
import { handleTaskDueDate } from "./handle_task_due_date.js";

// Declare variables
let activeItem = null;
let list_snapshot = [];

// Call buildList() function
buildList();

// Build List of tasks
export function buildList() {
  
  // Set current date parameters for comparison
  const today = new Date();
  const current_month = today.getMonth() + 1;
  const current_year = today.getFullYear();
  const current_date = today.getDate();

  // Target list-wrapper div
  let wrapper = document.getElementById("list-wrapper");

  // TESTING

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "includes/fetch_data.php", true);

  xhr.send();

  let list = {};

  xhr.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      list = data;
    }

    // Loop through tasks and check if task has been deleted
    for (let task in list) {
      handleList(task, list, wrapper);
    }

    for (let task in list) {
      handleTaskDueDate(task, list, current_month, current_year, current_date);
    }

    // Remove task from list if it has been deleted
    if (list_snapshot.length > list.length) {
      for (
        let list_length = list.length;
        list_length < list_snapshot.length;
        list_length++
      ) {
        document.getElementById(`data-row-${list_length}`).remove();
      }
    }

    //  Update list_snapshot
    list_snapshot = list;

    // Add event listeners to each task item
    for (let task in list) {
      addTaskEventListeners(task, list, activeItem);
    }
  };
}


