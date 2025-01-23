const taskInput = document.getElementById("taskInput")
const addTaskButton = document.getElementById("addButton")
const tasksList = document.getElementById("todosListContainer")


addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim()
    if (taskInput.value === "") return;
    addTask(taskText)
    taskInput.value = ""
})

function addTask(task) {
    const taskItem = document.createElement("li")
    taskItem.classList.add("task-item")

    taskItem.innerHTML = `
        <div class="task-text-container">
            <p>${task}</p>
            <select>
                <option>STATUS</option>
                <option><span><i class="fa-solid fa-circle-exclamation"></i></span> Not Started</option>
                <option><span><i class="fa-solid fa-clock"></i></span> Pending</option>
                <option><span><i class="fa-solid fa-check-double"></i></span> Completed</option>
            </select>
        </div>
        <div class="task-item-buttons-container">
            <button class="edit-button" id="editTask" type="button">Edit</button>
            <button class="delete-button" id="deleteTask" type="button">Delete</button>
        </div>
    `
    tasksList.appendChild(taskItem)
}