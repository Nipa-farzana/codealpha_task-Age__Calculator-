document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('input');
    const addButton = document.getElementById('add-button');
    const tasksContainer = document.getElementById('tasks');
    const taskCount = document.querySelector('.count');
    const alertMessage = document.getElementById('alrts');

    alertMessage.style.display = 'none';

    addButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = input.value.trim();

        if (taskText === '') {
            showAlert();
            return;
        }

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const taskContent = document.createElement('span');
        taskContent.innerText = taskText;
        taskContent.className = 'task-content';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => editTask(taskItem, taskContent));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        tasksContainer.appendChild(taskItem);
        updateTaskCount();

        
        input.value = '';
        
        hideAlert();
    }

    function editTask(taskItem, taskContent) {
        const newTaskText = prompt('Edit your task:', taskContent.innerText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskContent.innerText = newTaskText.trim();
        }
    }

    function deleteTask(taskItem) {
        tasksContainer.removeChild(taskItem);
        updateTaskCount();
    }

    function showAlert() {
        alertMessage.style.display = 'block';
    }

    function hideAlert() {
        alertMessage.style.display = 'none';
    }

    function updateTaskCount() {
        const taskItems = document.querySelectorAll('.task-item');
        taskCount.innerText = taskItems.length;
    }
});
