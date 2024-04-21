let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoButton = document.getElementById("addTodobutton");
let saveTodoButton = document.getElementById("Todobutton");

function TodoListFromLocalStorage(){
  let stringifytodolist = localStorage.getItem("todoList");
  let parsetodolist = JSON.parse(stringifytodolist);
  if(parsetodolist === null){
    return [];
  }else{
    return parsetodolist;
  }
}
let todoList = TodoListFromLocalStorage();

saveTodoButton.onclick = function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
}

let todoCount = todoList.length;

function onAddtodo(){
  let userInputElement = document.getElementById("todoUserInput");
  let userInputvalue = userInputElement.value;

  todoCount = todoCount+1;
  let newtodo = {
    text:userInputvalue,
    uniqueNo:todoCount,
    ischecked : false
  }
  if(userInputvalue===""){
    alert("please enter vaild text");
    return;
  }
  todoList.push(newtodo);
  createAndAppendTodo(newtodo);
  userInputElement.value = "";


}

todoButton.onclick = function(){
  onAddtodo();
}

function TodoChange(checkboxId,labelId,todoId){
  checkboxElement = document.getElementById(checkboxId);
  labelIdElement = document.getElementById(labelId);
  labelIdElement.classList.toggle("checked");

  let TodofindIndex = todoList.findIndex(function(eachTodoItem){
    let todoitemid = "todo" + eachTodoItem.uniqueNo;
    if(todoitemid === todoId){
      return true;
    }else{
      return false;
    }
  })

  let todoindex = todoList[TodofindIndex];

  if(todoindex.ischecked === true){
    todoindex.ischecked = false;
  }else{
    todoindex.ischecked = true;
  }
}

function TodoDelete(todoId){
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteElementIndex, 1);




}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;
  let todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.onclick = function(){
    TodoChange(checkboxId,labelId,todoId);
  }
  inputElement.checked = todo.ischecked;
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  if(todo.ischecked === true){
    labelElement.classList.add("checked");
  }
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    TodoDelete(todoId);

  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}