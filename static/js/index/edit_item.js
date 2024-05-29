import { buildList } from "./build_list.js";

let activeItem = null;
// Edit task function
export function editItem(task) {
    // Create new task button
    let create_btn =
      '<button id="create-new-task-btn" class="submit-button">Create New Task </button>';
    activeItem =task;
  
    // Set form values
    document.getElementById("title").value = activeItem.title;
    document.getElementById("date").value = activeItem.due_date;
    document.getElementById("submit").value = "Update Task";
    document.getElementById("create-button").innerHTML = create_btn;
    
    
}

// Handle form submission for adding tasks
let submit_button = document.getElementById("submit");
submit_button.addEventListener("click", function (event) {
    event.preventDefault();
    
    let url = "includes/form_handler.php";

    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let task_id = null;
    let completed = 0;
    let update_task = document.getElementById("submit").value;
    // Check if updating task instead of adding new task
    if (update_task === "Update Task") {
        url = "includes/task_update.php";
        task_id = activeItem.id;
        activeItem = null;
    }

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        buildList();

        // Reset button text to 'Add Task'
        document.getElementById("submit").value = "Add Task";

        // Reset form
        document.getElementById("form").reset();

        // Remove create new task button
        let button = document.getElementById("create-new-task-btn");
        if (button) {
            // Check if the button exists
            button.parentNode.removeChild(button);
        }
        }
    };
    xhr.send(
        `title=${title}&date=${date}&task_id=${task_id}&completed=${completed}`
    );
});