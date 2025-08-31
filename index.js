let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData||[];

/**Creating function to get unique id */
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxxx-xxxxxxxxxxxx".replace(/[xy]/g,function (param){
        let number = Math.random()*16|0;
        let randomNumber = param == 'x'? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    })
}

showTodos.addEventListener("click",(e)=>{
    //All DOM have .dataset object that contains all data-* attributes of that element 
    let key = e.target.dataset.key;
    // Capturing key of the object which trigger click fro parent div element
    // Checking which key has triggered from todoList using map
    let delTodokey = e.target.dataset.todokey; //Define different data key
    todoList = todoList.map(todo => todo.id === key ? {...todo,isComplete:!todo.isComplete}:todo);
    todoList = todoList.filter(todo => todo.id !== delTodokey);
    renderTodoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    //console.log(todoList);
    //renderTodoList(todoList);// Most Important to render the list after update
})

addTodoButton.addEventListener("click",(event) => {
    event.preventDefault();
    todo = todoInput.value;
    if(todo.length>0){
        todoList.push({id: uuid(), todo, isComplete: false});
    }
    renderTodoList(todoList);
    todoInput.value = "";
    localStorage.setItem("todo",JSON.stringify(todoList));
})

function renderTodoList(todoList){
    showTodos.innerHTML = todoList.map(({id,todo,isComplete}) => 
        `<div class="relative">
        <input id="item-${id}" type='checkbox' data-key=${id} ${isComplete?"checked":""} class="t-checkbox t-pointer">
        <label for="item-${id}" data-key=${id} class="todo todo-text t-pointer ${isComplete ? "checked-todo" : ""}">${todo}</label>
        <button class="button cursor del-btn absolute right-0">
        <span data-todokey=${id} class="material-icons-outlined">delete</span></button>
        </div>`);
    // conditional class addition
}

renderTodoList(todoList);