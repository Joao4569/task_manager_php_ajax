// This file contains functions that construct the task list items
export function constructTaskItem(task, date, title, current_status) {
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

