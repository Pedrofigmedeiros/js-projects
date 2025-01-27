document.addEventListener('DOMContentLoaded', () => {
  const todoList = []; // Create the empty array

  renderTodoList(); // Render the initial (empty) todo list

  // Function to add a new todo item
  function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const todo = inputElement.value; // Get the text from the input
    todoList.push(todo); // Add the new item to the array
    console.log(todoList); // Display the updated array in the console
    inputElement.value = ''; // Clear the input field

    renderTodoList();
  }

  // Function to render the todo list items
  function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      todoListHTML += `<p>${item}</p>`;
    }

    document.querySelector('.js-todo-items').innerHTML = todoListHTML;
  }

  // Add event listener for the "Enter" key in the input field
  const inputElement = document.querySelector('.js-name-input');
  inputElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  // Expose the `addTodo` function to the global scope
  window.addTodo = addTodo;
});