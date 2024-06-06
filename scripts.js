let users = [];
let currentUser = null;

document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('user-name').textContent = currentUser.username;
        showSection('profile-section');
        showSection('todo-section');
        hideSection('login-section');
    } else {
        alert('Invalid credentials!');
    }
});

document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        users.push({ username, password, tasks: [] });
        alert('Registration successful!');
    } else {
        alert('Please enter both username and password.');
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    currentUser = null;
    hideSection('profile-section');
    hideSection('todo-section');
    showSection('login-section');
});

document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    const taskDateTime = document.getElementById('task-datetime').value;

    if (taskText && taskDateTime) {
        const taskList = document.getElementById('task-list');

        const listItem = document.createElement('li');
        listItem.textContent = `${taskText} - ${taskDateTime}`;

        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
        });

        listItem.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            taskList.removeChild(listItem);
        });

        taskList.appendChild(listItem);
        currentUser.tasks.push({ text: taskText, dateTime: taskDateTime, completed: false });

        taskInput.value = '';
        document.getElementById('task-datetime').value = '';
    }
});

function showSection(id) {
    document.getElementById(id).style.display = 'block';
}

function hideSection(id) {
    document.getElementById(id).style.display = 'none';
}
