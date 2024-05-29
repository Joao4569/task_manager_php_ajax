import { updateTaskStatus } from './update_task_status.js';
import { constructTaskItem } from './construct_task_list.js';

// Function to handle list creation
export function handleList(task, list, wrapper) {
    let deleted_task = document.getElementById(`data-row-${task}`);
    if (deleted_task) {
      deleted_task.remove();
    }
    let { date, title, current_status } = updateTaskStatus(list[task]);
    let item = constructTaskItem(task, date, title, current_status);
    wrapper.innerHTML += item;
}