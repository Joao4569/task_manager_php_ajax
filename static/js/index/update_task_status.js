// Function to update task status
export function updateTaskStatus(task) {

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
  
    // Return updated task details
    return { date, title, current_status };
}