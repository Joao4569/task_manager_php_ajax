// Edit task function
export function editItem(task, activeItem) {
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