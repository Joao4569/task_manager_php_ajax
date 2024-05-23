// Declare variables
let activeItem = null;
let list_snapshot = [];


// Call buildList() function
buildList();

// Build List of tasks
function buildList() {

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
            handleTaskDueDate(
              task,
              list,
              current_month,
              current_year,
              current_date
            );
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
            addTaskEventListeners(task, list);
        } 
        
    };
    

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

    // Check if updating task instead of adding new task
    if (activeItem != null) {
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
    }
    xhr.send(`title=${title}&date=${date}&task_id=${task_id}&completed=${completed}`);
});




// Function to handle list creation
function handleList(task, list, wrapper) {
    let deleted_task = document.getElementById(`data-row-${task}`);
    if (deleted_task) {
      deleted_task.remove();
    }
    let { date, title, current_status } = updateTaskStatus(list[task]);
    let item = constructTaskItem(task, date, title, current_status);
    wrapper.innerHTML += item;
}

// Function to update task status
function updateTaskStatus(task) {
    // Initialize variables
    let date = `<span class="title">${task.due_date}</span>`;
    let title = `<span class="title">${task.title}</span>`;
    let current_status = '<i class="fa-solid fa-check"></i>';
  
    // Visually represent status of task
    if (task.completed === "1") {
      // Add strike through to completed tasks
      date = `<strike class="title">${task.due_date}</strike>`;
      title = `<strike class="title">${task.title}</strike>`;
      // Set new icon for completed tasks
      current_status = '<i class="fa-solid fa-xmark"></i>';
    }
  
    return { date, title, current_status };
}

function constructTaskItem(task, date, title, current_status) {
    // Construct each task item
    let item = `
          <div id="data-row-${task}" class="task-wrapper flex-wrapper">
              <div class="date-input">
                  ${date}
              </div>
              <div class="task-list-item-container">
                  ${title}
              </div>
              <div class="task-list-button-container">
                  <button class="task-list-button edit"><i class="fa-solid fa-pen-to-square"></i></button>
              </div>
              <div class="task-list-button-container">
                  <button class="task-list-button delete"><i class="fa-solid fa-trash"></i></button>
              </div>
              <div class="task-list-button-container">
                  <button class="task-list-button status">${current_status}</button>
              </div>
          </div>
      `;
    return item;
  }

// Edit task function
function editItem(task) {
    // Create new task button
    let create_btn =
        '<button id="create-new-task-btn" class="submit-button">Create New Task </button>';
    activeItem = task;

    // Set form values
    document.getElementById("title").value = activeItem.title;
    document.getElementById("date").value = activeItem.due_date;
    document.getElementById("submit").value = "Update Task";
    document.getElementById("create-button").innerHTML = create_btn;
}


function deleteItem(task) {
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
    }

    xhr.send(`task_id=${task_id}`);
}

// Task completed function
function taskCompleted(task) {
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
    }

    xhr.send(`title=${title}&date=${date}&task_id=${task_id}&completed=${completed}`);

}

// Function to mark task as overdue
function markTaskAsOverdue(task) {
  let overdue_date = document.getElementById(`data-row-${task}`);
  overdue_date.classList.add("overdue");
}

// Function to handle task due date
function handleTaskDueDate(
  task,
  list,
  current_month,
  current_year,
  current_date
) {
  let task_date = list[task].due_date;
  let date_array = task_date.split("-");
  let task_year = parseInt(date_array[0]);
  let task_month = parseInt(date_array[1]);
  let task_day_date = parseInt(date_array[2]);

  if (task_year < current_year && list[task].completed != "1") {
    let overdue_date = document.getElementById(`data-row-${task}`);
    overdue_date.classList.add("overdue");
  } else if (task_year > current_year) {
    return;
  } else if (
    task_month < current_month &&
    list[task].completed != "1"
  ) {
    markTaskAsOverdue(task);
  } else if (
    task_day_date < current_date &&
    list[task].completed != "1"
  ) {
    markTaskAsOverdue(task);
  } else if (
    task_year === current_year &&
    task_month === current_month &&
    task_day_date === current_date &&
    list[task].completed != "1"
  ) {
    let today_tasks = document.getElementById(`data-row-${task}`);
    today_tasks.classList.add("current-day");
  }
}

// Function to add event listeners to each task item
function addTaskEventListeners(task, list) {
    let editBtn = document.getElementsByClassName("edit")[task];
    let deleteBtn = document.getElementsByClassName("delete")[task];
    let statusBtn = document.getElementsByClassName("status")[task];

    editBtn.addEventListener("click", function () {
        editItem(list[task]);
        
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
