import { updateTaskStatus } from './update_task_status.js';
import { constructTaskItem } from './construct_task_list.js';

// Function to handle list creation
export function handleList(task, list, wrapper) {

    // Check if task has been deleted
    let deleted_task = document.getElementById(`data-row-${task}`);

    // Remove task if it has been deleted
    if (deleted_task) {
      deleted_task.remove();
    }

    // Update task status
    let { date, title, current_status } = updateTaskStatus(list[task]);

    // Construct task item
    let item = constructTaskItem(task, date, title, current_status);

    // Append task item to list wrapper
    wrapper.innerHTML += item;
}