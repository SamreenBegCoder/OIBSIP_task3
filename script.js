let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        timestamp: new Date().toLocaleString()
    };

    pendingTasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    pendingTasks.forEach(task => {
        const listItem = createTaskItem(task, 'pending');
        pendingList.appendChild(listItem);
    });

    completedTasks.forEach(task => {
        const listItem = createTaskItem(task, 'completed');
        completedList.appendChild(listItem);
    });
}

function createTaskItem(task, type) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text} <small>(Added on: ${task.timestamp})</small></span>
        <div class="task-controls">
            ${type === 'pending' ? `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` : ''}
            <button class="edit-btn" onclick="editTask(${task.id}, '${type}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id}, '${type}')">Delete</button>
        </div>
    `;

    if (type === 'completed') {
        li.classList.add('completed');
    }

    return li;
}

function completeTask(id) {
    const taskIndex = pendingTasks.findIndex(task => task.id === id);
    const [completedTask] = pendingTasks.splice(taskIndex, 1);

    completedTask.timestamp = new Date().toLocaleString(); // Update completion time
    completedTasks.push(completedTask);
    renderTasks();
}

function editTask(id, type) {
    const taskArray = type === 'pending' ? pendingTasks : completedTasks;
    const task = taskArray.find(task => task.id === id);

    const newText = prompt('Edit your task:', task.text);
    if (newText && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

function deleteTask(id, type) {
    if (type === 'pending') {
        pendingTasks = pendingTasks.filter(task => task.id !== id);
    } else {
        completedTasks = completedTasks.filter(task => task.id !== id);
    }

    renderTasks();
}

renderTasks();
