document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToList);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() !== "") {
    addTaskToList(taskInput.value);
    saveTask(taskInput.value);
    taskInput.value = "";
  }
}

function addTaskToList(taskText) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    taskList.removeChild(li);
    deleteTask(taskText);
  };

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
