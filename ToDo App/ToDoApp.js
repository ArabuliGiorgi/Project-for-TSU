// Theme changer
let darkMode = false;
const body = document.body;
function changeTheme(){
    darkMode = !darkMode;
    if(darkMode){
        body.classList.add("Theme2");
    }else{
        body.classList.remove("Theme2");
    }
}

// input check manager
let inputCheck = false;
const Check = document.querySelector(".check");
function handleCheckClick(){
    inputCheck = !inputCheck;
    if(inputCheck){
        Check.classList.remove("check");
        Check.classList.add("checked");
    }else{
        Check.classList.remove("checked");
        Check.classList.add("check");
    }
}

// todos manager
let myTodos = [
    {
        id: 5,
        text: "Have a nice Christmas",
        completed: false
    },
    {
        id: 4,
        text: "Submit the project",
        completed: false
    },
    {
        id: 3,
        text: "Make project for TSU",
        completed: true
    },
    {
        id: 2,
        text: "10 minutes mediation",
        completed: false
    },
    {
        id: 1,
        text: "Study Javascript",
        completed: true
    }
];
let compTodos, activeTodos;
function manageTodos(){
    compTodos = myTodos.filter((element) => element.completed);
    activeTodos = myTodos.filter((element) => !element.completed);
}
manageTodos();

let listToShow = myTodos;
let viewKey = "all";
const todosNumber = document.getElementById("todos-number");
function updateListToShow(){
    switch(viewKey){
        case 'all': listToShow = myTodos; break;
        case 'active': listToShow = activeTodos; break;
        default: listToShow = compTodos;
    }
    todosNumber.textContent = listToShow.length;
}
updateListToShow();

// functions for clicks
const listViewKeys = [
    document.getElementById("all"),
    document.getElementById("active"),
    document.getElementById("completed")
];
function handleViewChange(str){
    listViewKeys.forEach((element) => {
        element.className = "inactive";
    });
    viewKey = str;
    switch(str){
        case 'all': listViewKeys[0].className = "active"; break;
        case 'active': listViewKeys[1].className = "active"; break;
        default: listViewKeys[2].className = "active";
    }
    updateListToShow();
    display();
}

function clearCompleted(){
    myTodos = activeTodos;
    manageTodos();
    updateListToShow();
    display();
}

function handleKeyDown(e){
    if(e.key === "Enter"){
        let id = 1;
        if(myTodos.length !== 0){
            id = myTodos[0].id + 1;
        }
        if(e.target.value.trim() !== ""){
            myTodos.unshift({
                id: id,
                text: e.target.value,
                completed: inputCheck
            });
            e.target.value = "";
            if(inputCheck){
                handleCheckClick();
            }
        }
        manageTodos();
        updateListToShow();
        display();
    }
}

function eraseElement(e){
    myTodos = myTodos.filter((element) => element.id !== Number(e.target.parentElement.dataset.id));
    manageTodos();
    updateListToShow();
    display();
}
function handleTodoCheck(e){
    myTodos.forEach((element) => {
        if(element.id === Number(e.target.parentElement.parentElement.dataset.id))
            element.completed = !element.completed;
    });
    manageTodos();
    updateListToShow();
    display();
}

const todoList = document.getElementById("list");
function display(){
    todoList.innerHTML = "";
    listToShow.forEach((element) => {
        todoList.innerHTML += `
            <div class="single" data-id="${element.id}">
                <div class="todo">
                    <div class="circle${element.completed ? 'd' : ''}" onclick="handleTodoCheck(event)"></div>
                    <h1 class="${element.completed ? 'completed' : 'active'}-todo" onclick="handleTodoCheck(event)">${element.text}</h1>
                </div>
                <img src="images/icon-cross.svg" alt="cross" class="cross" onclick="eraseElement(event)">
            </div>
        `;
    });
}
display();