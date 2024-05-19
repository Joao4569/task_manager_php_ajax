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
    let wrapper = document.getElementById('list-wrapper');
    
    // Specify URL to fetch data from API
    let url = 'http://127.0.0.1:8000/api/task-list/';

    // Fetch data from API
    fetch(url)

    // Convert response to JSON
    .then((resp) => resp.json())

    // Handle data
    .then(function(data) {

        // Loop through data and construct a list of tasks
        let list = data;

        // Loop through tasks and check if task has been deleted
        for (let task in list) {
            handleTaskDeletion(task, list, wrapper);
        }

        // Loop through tasks and indicate whether due date is overdue or current
        for (let task in data) {
            handleTaskDueDate(task, data, current_month, current_year, current_date);
        }

        // Remove task from list if it has been deleted
        if (list_snapshot.length > list.length) {
            for (let list_length = list.length; list_length < list_snapshot.length; list_length++) {
                document.getElementById(`data-row-${list_length}`).remove();
            }
        }

        //  Update list_snapshot
        list_snapshot = list;

        // Add event listeners to each task item
        for (let task in list) {
            addTaskEventListeners(task, list);
        }

        })
    }

// Add event listener to form for handling submission
let form = document.getElementById('form-wrapper');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Set URL for API
    let url = 'http://127.0.0.1:8000/api/task-create/';

    // Check if activeItem is not null
    if(activeItem != null) {
        url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
        activeItem = null;
    }

    // Get form data
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;

    // Post form data to API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'HTTP_X_CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'title': title,
            'due_date': date,
        }),
    }
    ).then(function(response) {
        buildList();

        // Reset button text to 'Add Task'
        document.getElementById('submit').value = 'Add Task';

        // Reset form
        document.getElementById('form').reset();

        // Remove create new task button
        let button = document.getElementById('create-new-task-btn');
        if (button) { // Check if the button exists
            button.parentNode.removeChild(button);
        }
    })
})

// Edit task function
function editItem(task) {

    // Create new task button
    let create_btn = '<button id="create-new-task-btn" class="submit-button">Create New Task </button>';
    activeItem = task;

    // Set form values
    document.getElementById('title').value = activeItem.title;
    document.getElementById('date').value = activeItem.due_date;
    document.getElementById('submit').value = 'Update Task';
    document.getElementById('create-button').innerHTML = create_btn;
}

// Delete task function
function deleteItem(task) {

    // Set URL for API
    let url = `http://127.0.0.1:8000/api/task-delete/${task.id}/`;

    // Fetch data from API
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'HTTP_X_CSRFToken': csrftoken,
        },
    }).then((response) => {
        buildList();
    })
}

// Task completed function
function taskCompleted(task) {

    // Set URL for API
    let url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;

    // Fetch data from API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'HTTP_X_CSRFToken': csrftoken,
        },
        body:JSON.stringify({
            'title': task.title,
            'due_date': task.due_date,
            'completed': !task.completed,
        })
    }).then((response) => {
        buildList();
    })

}

// Function to mark task as overdue
function markTaskAsOverdue(task) {
    let overdue_date = document.getElementById(`data-row-${task}`);
    overdue_date.classList.add("overdue");
}

// Function to update task status
function updateTaskStatus(task) {
    // Initialize variables
    let date = `<span class="title">${task.due_date}</span>`;
    let title = `<span class="title">${task.title}</span>`;
    let current_status = '<i class="fa-solid fa-check"></i>';

    // Visually represent status of task
    if (task.completed.toString() === "true") {
        // Add strike through to completed tasks
        date = `<strike class="title">${task.due_date}</strike>`;
        title = `<strike class="title">${task.title}</strike>`;
        // Set new icon for completed tasks
        current_status = '<i class="fa-solid fa-xmark"></i>';
    }

    return {date, title, current_status};
}

function constructTaskItem(task, date, title, current_status) {
    // Construct each task item
    let item =`
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
                <button id="status" class="task-list-button status">${current_status}</button>
            </div>
        </div>
    `
    return item;
}

// Function to handle task deletion
function handleTaskDeletion(task, list, wrapper) {
    let deleted_task = document.getElementById(`data-row-${task}`);
    if (deleted_task) {
        deleted_task.remove();
    }
    let {date, title, current_status} = updateTaskStatus(list[task]);
    let item = constructTaskItem(task, date, title, current_status);
    wrapper.innerHTML += item;
}

// Function to handle task due date
function handleTaskDueDate(task, data, current_month, current_year, current_date) {
    let task_date = data[task].due_date;
    let date_array = task_date.split('-');
    let task_year = parseInt(date_array[0]);
    let task_month = parseInt(date_array[1]);
    let task_day_date = parseInt(date_array[2]);

    if (task_year < current_year && data[task].completed.toString() != "true") {
        let overdue_date = document.getElementById(`data-row-${task}`);
        overdue_date.classList.add("overdue");
    } else if (task_year > current_year) {
        return;
    } else if (task_month < current_month && data[task].completed.toString() != "true") {
        markTaskAsOverdue(task);
    } else if (task_day_date < current_date && data[task].completed.toString() != "true") {
        markTaskAsOverdue(task);
    } else if (task_year === current_year && task_month === current_month && task_day_date === current_date && data[task].completed.toString() != "true") {
        let today_tasks = document.getElementById(`data-row-${task}`);
        today_tasks.classList.add("current-day");
    }
}

// Function to add event listeners to each task item
function addTaskEventListeners(task, list) {
    let editBtn = document.getElementsByClassName('edit')[task];
    let deleteBtn = document.getElementsByClassName('delete')[task];
    let statusBtn = document.getElementsByClassName('status')[task];

    editBtn.addEventListener('click', function() {
        editItem(list[task]);
        let create_button = document.getElementById('create-button');
        create_button.addEventListener('click', function(event) {
            activeItem = null;
            document.getElementById('title').value = '';
            document.getElementById('date').value = '';
            document.getElementById('submit').value = 'Add Task';
            document.getElementById('create-button').innerHTML = "";
        });
    });

    deleteBtn.addEventListener('click', function() {
        deleteItem(list[task]);
    });

    statusBtn.addEventListener('click', function() {
        taskCompleted(list[task]);
    });
}
