const todoList = [{
  name: 'make dinner',
  dueDate: '20-12-2025'
}, {
  name: 'wash dishes',
  dueDate: '12-02-2025'
}];

renderTodoList();

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value; // get the text from the textbox

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name, 
    dueDate
  }); // add it to the arrays
  inputElement.value = ''; // delete the text in the textbox

  renderTodoList();
}

function renderTodoList(){
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
      " class="delete-button">Delete</button>
    `;
    todoListHTML += html;
  }
  console.log(todoListHTML);

  document.querySelector('.js-todo-items').innerHTML = todoListHTML;
}