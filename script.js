const displayInput = document.querySelector('.js-input-h');
const displayText = document.querySelector('.js-text');
const button = document.querySelector('.js-button');

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll('.js-input')).map(taskDiv => {
    return taskDiv.querySelector('.task-text').textContent;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('js-input');
  
  const span = document.createElement('span');
  span.classList.add('task-text');
  span.textContent = taskText;
  taskDiv.appendChild(span);

  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.textContent = 'Edit';
  taskDiv.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';
  taskDiv.appendChild(deleteButton);

  // Add event listeners
  editButton.addEventListener('click', () => handleEdit(editButton, span));
  deleteButton.addEventListener('click', () => handleDelete(taskDiv));

  return taskDiv;
}

// Function to handle editing a task
function handleEdit(editButton, taskTextElement) {
  if (editButton.textContent === 'Edit') {
    taskTextElement.contentEditable = true;
    taskTextElement.focus();
    taskTextElement.classList.add('editable');
    editButton.textContent = 'Save';
  } else {
    taskTextElement.contentEditable = false;
    taskTextElement.classList.remove('editable');
    editButton.textContent = 'Edit';
    saveTasks(); //  Save after editing
  }
}

// Function to handle deleting a task
function handleDelete(taskElement) {
  taskElement.remove();
  saveTasks(); //  Save after deleting
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => displayText.appendChild(createTaskElement(taskText)));
}

// Event listener for the button to add new tasks
button.addEventListener('click', () => {
  const taskText = displayInput.value.trim();
  if (!taskText) {
    alert('Add your tasks');
    return;
  }
  const newTask = createTaskElement(taskText);
  displayText.appendChild(newTask);
  displayInput.value = '';
  saveTasks(); 
  
});

// Load tasks from localStorage when the page loads
window.addEventListener('load', loadTasks);
