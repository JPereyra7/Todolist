import "./../scss/style.scss";

//Loading the list in the array localstorage
document.addEventListener("DOMContentLoaded", function () {
    loadTodos();
});

const todoList = ["Watch Soccer", "Take out the trash", "Book a dentist appointment", "Call the broker"];

const completedTasks = [];

// Create a hook to the tasks and completed task ID's
const todoListContainer = document.getElementById("themTasks");
const completedContainer = document.getElementById("themFinished");

// Create hook for input and button
const inputID = document.getElementById("inputID");
const buttonID = document.getElementById("buttonID");

// Hook for the clear button

const clearButtonID = document.getElementById("clearID");

clearButtonID.addEventListener("click", function (e) {
    e.preventDefault();

    todoList.length = 0;
    completedTasks.length = 0;
    
    createTodoListHtml();
    createCompletedHtml();

    saveTodos();
});



// Adding the click event when adding new task

buttonID.addEventListener("click", function(e) {
    e.preventDefault();

    const newTask = inputID.value;
    if (newTask.trim() !== "") {
        todoList.unshift(newTask);
        saveTodos();

        createTodoListHtml();
    }
    inputID.value = "";
});

//First function
function saveTodos() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

//Second function
function loadTodos() {
    const storedTodos = localStorage.getItem('todoList');

    if (storedTodos) {
        const storedTodos = localStorage.getItem('todoList');

        if (storedTodos) {
            todoList.length = 0;
            const parsedTodos = JSON.parse(storedTodos);
            Array.prototype.push.apply(todoList, parsedTodos);
            createTodoListHtml();
        }
    }
}

//Third function - Input input function and button event
function createInputHtml() {
    inputID.innerHTML = "";

    inputWritten.forEach((completedInput, i) => {
        const inputContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = completedInput;
        inputContainer.className = "todo";

        inputContainer.addEventListener("submit", () => {
            todoList.unshift(completedInput);
            console.log(todoList);
    });
                inputContainer.appendChild(title);
            inputID.appendChild(inputContainer);
        });
    }

//Fourth Function
function createCompletedHtml() {
    completedContainer.innerHTML = "";

    completedTasks.forEach((completedItem, i) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = completedItem;
        todoContainer.className = "todo";

        todoContainer.addEventListener("click", () => {
            // Move the task back to the todo list
            todoList.push(completedItem);
            console.log(todoList);

            completedTasks.splice(i, 1);

            createCompletedHtml();
            createTodoListHtml();
        });

        todoContainer.appendChild(title);
        completedContainer.appendChild(todoContainer);
    });
}

//Fifth Function
function createTodoListHtml() {
    todoListContainer.innerHTML = "";

    todoList.forEach((todo) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = todo;
        todoContainer.className = "todo";
        todoContainer.addEventListener("click", () => {
            completedTasks.push(todo);
            saveTodos();
            createCompletedHtml();

            // Remove the task from todoList
            const index = todoList.indexOf(todo);
            if (index !== -1) {
                todoList.splice(index, 1);
            }

            createTodoListHtml();
        });

        todoContainer.appendChild(title);
        todoListContainer.appendChild(todoContainer);
    });
}

createTodoListHtml();
createCompletedHtml();
