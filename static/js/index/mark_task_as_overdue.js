// Function to mark task as overdue
export function markTaskAsOverdue(task) {

    // Get task item
    let overdue_date = document.getElementById(`data-row-${task}`);

    // Add overdue class to task item
    overdue_date.classList.add("overdue");
  }