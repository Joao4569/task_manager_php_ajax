import { markTaskAsOverdue } from "./mark_task_as_overdue.js";

// Function to handle task due date
export function handleTaskDueDate(
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
    } else if (task_month < current_month && list[task].completed != "1") {
      markTaskAsOverdue(task);
    } else if (task_day_date < current_date && list[task].completed != "1") {
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