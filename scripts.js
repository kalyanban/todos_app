const taskInput = document.getElementById("taskInput")
const addTaskButton = document.getElementById("addButton")
const tasksList = document.getElementById("todosListContainer")

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if (storedTasks) {
        storedTasks.forEach(task => tasks.push(task))
        updateTasksList()
        updateStats()
    }
})

let tasks = []

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const addTask = () => {
    const taskInputValue = taskInput.value.trim()

    if (taskInputValue) {
        tasks.push({text: taskInputValue, completed: false})
        taskInput.value = ""

        updateTasksList()
        updateStats()
        saveTasks()
    }
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed
    console.log({tasks})
    updateTasksList()
    updateStats()
    saveTasks()
}

const deleteTask = (index) => {
    tasks.splice(index,1)
    updateTasksList()
    updateStats()
    saveTasks()
}

const editTask = (index) => {
    taskInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTasksList()
    updateStats()
    saveTasks()
}

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks/totalTasks)*100
    const progressBar = document.getElementById("status")
    progressBar.style.width = `${progress}%`

    const stats = document.getElementById("stats")
    stats.innerText = `${completedTasks} / ${totalTasks}`

    if (tasks.length && completedTasks === totalTasks) {
        blastConfetti()
    }
}

const updateTasksList = () => {
    tasksList.innerHTML = ''

    tasks.forEach((task, index) => {
        const li = document.createElement("li")

        li.innerHTML = `
            <div class="task-item">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p class="${task.completed ? "completed" : ""}">${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square" onClick="editTask(${index})"></i>
                    <i class="fa-regular fa-trash-can" onClick="deleteTask(${index})"></i>
                </div>    
            </div>
        `
        li.addEventListener("click", () => toggleTaskComplete(index))
        tasksList.append(li)
    })
}

addTaskButton.addEventListener("click", function(event) {
    event.preventDefault()

    addTask()
})

const blastConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });
      
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
}