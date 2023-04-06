const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// Get todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button class="edit-todo" data-index="${index}">Edit</button>
        <button class="delete-todo" data-index="${index}">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Add a new todo
function addTodo() {
  const todo = todoInput.value.trim();
  if (todo !== '') {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
}

// Edit a todo
function editTodo(index) {
  const newTodo = prompt('Enter a new todo:', todos[index]);
  if (newTodo !== null) {
    todos[index] = newTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
}

// Delete a todo
function deleteTodo(index) {
  if (confirm('Are you sure you want to delete this todo?')) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
}

// Event listeners
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', event => {
  const target = event.target;
  const index = target.getAttribute('data-index');
  if (target.classList.contains('edit-todo')) {
    editTodo(index);
  } else if (target.classList.contains('delete-todo')) {
    deleteTodo(index);
  }

renderTodos();
});