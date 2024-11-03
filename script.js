document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToList(task.text, task.completed));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() !== "") {
    addTaskToList(taskInput.value, false);
    saveTask(taskInput.value, false);
    taskInput.value = "";
  }
}

function addTaskToList(taskText, isCompleted) {
  const taskList = document.getElementById("taskList");

  // Create list item
  const li = document.createElement("li");
  li.className = isCompleted ? "completed" : "";
  li.dataset.completed = isCompleted; // Set data attribute for easy filtering

  // Create checkbox for marking completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "complete-checkbox";
  checkbox.checked = isCompleted;
  checkbox.onclick = () => toggleComplete(li, taskText);

  // Create text node
  const taskTextNode = document.createElement("span");
  taskTextNode.textContent = taskText;
  taskTextNode.style.flex = "1"; // Make text expand to fill space

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = () => {
    taskList.removeChild(li);
    deleteTask(taskText);
  };

  li.appendChild(checkbox);
  li.appendChild(taskTextNode);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function saveTask(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(li, taskText) {
  li.classList.toggle("completed");
  li.dataset.completed = li.classList.contains("completed"); // Update data attribute

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks() {
  const filterValue = document.getElementById("taskFilter").value;
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    const isCompleted = task.classList.contains("completed");
    if (filterValue === "all") {
      task.style.display = "flex";
    } else if (filterValue === "completed" && isCompleted) {
      task.style.display = "flex";
    } else if (filterValue === "uncompleted" && !isCompleted) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
