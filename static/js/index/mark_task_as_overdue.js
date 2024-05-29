// Function to mark task as overdue
export function markTaskAsOverdue(task) {
    let overdue_date = document.getElementById(`data-row-${task}`);
    overdue_date.classList.add("overdue");
  }