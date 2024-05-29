import { editItem } from "./update_create_task.js";
import { deleteItem } from "./delete_item.js";
import { taskCompleted } from "./task_completed.js";

// Function to add event listeners to each task item
export function addTaskEventListeners(task, list) {
  let editBtn = document.getElementsByClassName("edit")[task];
  let deleteBtn = document.getElementsByClassName("delete")[task];
  let statusBtn = document.getElementsByClassName("status")[task];

  // Handle edit button click
  editBtn.addEventListener("click", function () {
    editItem(list[task]);

    let create_button = document.getElementById("create-button");
    create_button.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("title").value = "";
      document.getElementById("date").value = "";
      document.getElementById("submit").value = "Add Task";
      document.getElementById("create-button").innerHTML = "";
    });
  });

  // Handle delete button click
  deleteBtn.addEventListener("click", function () {
    deleteItem(list[task]);
  });

  // Handle status button click
  statusBtn.addEventListener("click", function () {
    taskCompleted(list[task]);
  });
}
