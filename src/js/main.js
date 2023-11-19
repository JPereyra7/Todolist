import "./../scss/style.scss";


const todoList = ["Watch Soccer", "Take out the trash", "Book a dentist appointment", "Call the broker"];

const completedTasks = [];

// Create a hook to the tasks and completed task ID's
const todoListContainer = document.getElementById("themTasks");
const completedContainer = document.getElementById("themFinished");

// Create hook for input and button
const inputID = document.getElementById("inputID");
const buttonID = document.getElementById("buttonID");

buttonID.addEventListener("click", function(e) {
    e.preventDefault();

    const newTask = inputID.value;
    if (newTask.trim() !== "") {
        todoList.unshift(newTask);
        console.log(todoList);

        createTodoListHtml();
    }
    inputID.value = "";
});

//Input input function and button event
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

//Second Function
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

//Third Function
function createTodoListHtml() {
    todoListContainer.innerHTML = "";

    todoList.forEach((todo) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = todo;
        todoContainer.className = "todo";
        todoContainer.addEventListener("click", () => {
            completedTasks.push(todo);
            console.log(completedTasks);
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
