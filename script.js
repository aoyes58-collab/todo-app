
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

const total = document.querySelector("#total");
const completed = document.querySelector("#completed");
const pending = document.querySelector("#pending");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function showTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        if (task.done) {
            span.classList.add("done");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Complete task
        checkbox.addEventListener("change", function() {

            tasks[index].done = checkbox.checked;

            saveTasks();
        });

        // Delete task
        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
        });

        li.append(checkbox, span, deleteBtn);

        taskList.appendChild(li);

    });

    updateStats();
}

// Add new task
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        done: false
    });

    taskInput.value = "";

    saveTasks();
}

// Save tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

// Update statistics
function updateStats() {

    total.textContent = tasks.length;

    const doneCount = tasks.filter(function(task) {
        return task.done;
    }).length;

    completed.textContent = doneCount;

    pending.textContent = tasks.length - doneCount;
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Initial display
showTasks();
