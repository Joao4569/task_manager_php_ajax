import { editItem } from "./edit_item.js";
import { deleteItem } from "./delete_item.js";
import { taskCompleted } from "./task_completed.js";

// Function to add event listeners to each task item
export function addTaskEventListeners(task, list, activeItem) {
    let editBtn = document.getElementsByClassName("edit")[task];
    let deleteBtn = document.getElementsByClassName("delete")[task];
    let statusBtn = document.getElementsByClassName("status")[task];
  
    editBtn.addEventListener("click", function () {
      editItem(list[task], activeItem);
  
      let create_button = document.getElementById("create-button");
      create_button.addEventListener("click", function (event) {
        event.preventDefault();
        activeItem = null;
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("submit").value = "Add Task";
        document.getElementById("create-button").innerHTML = "";
      });
    });
  
    deleteBtn.addEventListener("click", function () {
      console.log("Delete button clicked");
      deleteItem(list[task]);
    });
  
    statusBtn.addEventListener("click", function () {
      taskCompleted(list[task]);
    });
  }