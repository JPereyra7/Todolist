import "./../scss/style.scss";

//Loading the list in the array localstorage
document.addEventListener("DOMContentLoaded", function () {
    loadTodos();
});

//Defining my variabel called Original which is a class object
class Original {
    task;

    constructor (task) {
        this.task = task;
    }
}

// Four variabels with string value of each tasks.
const todoList1 = new Original("Watch Soccer");
const todoList2 = new Original("Take the trash out");
const todoList3 = new Original("Book a dentist appointment");
const todoList4 = new Original("Call the broker");

const todoList = [todoList1, todoList2, todoList3, todoList4];
const completedTasks = [];

// Create a hook to the tasks and completed task ID's || and input, and button
const todoListContainer = document.getElementById("themTasks");
const completedContainer = document.getElementById("themFinished");
const inputID = document.getElementById("inputID");
const buttonID = document.getElementById("buttonID");
const clearButtonID = document.getElementById("clearID");

//Event listener listening for a click to reset completed tasks
clearButtonID.addEventListener("click", function (e) {
    //Prevent the submit behaviour!
    e.preventDefault();

    //Clears the completedTasks array
    completedTasks.length = 0;
    
    createTodoListHtml();
    createCompletedHtml();

    //Save to local storage
    saveTodos();
});

// Adding the click event when adding new task || using the add button
buttonID.addEventListener("click", function(e) {
    e.preventDefault();

    const newTask = inputID.value;
    if (newTask.trim() !== "") {
        todoList.unshift(new Original(newTask));

        //Save to localstorage
        saveTodos();

        createTodoListHtml();
    }
    //Resets/clears the input text written in the textfield
    inputID.value = "";
});

//SaveTodos was created to save the todoList to localstorage
function saveTodos() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

//loadTodos was created to load the todoList from localstorage
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

//Function that creates html code for the completed tasks and moves it back to the active list through a click event
function createCompletedHtml() {
    completedContainer.innerHTML = "";

    completedTasks.forEach((completedItem, i) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = completedItem;
        todoContainer.className = "todo";

        todoContainer.addEventListener("click", () => {
            // Move the task back to the todo list
            todoList.push(new Original(completedItem));

            completedTasks.splice(i, 1);

            createCompletedHtml();
            createTodoListHtml();
        });

        todoContainer.appendChild(title);
        completedContainer.appendChild(todoContainer);
    });
}

//Works similar to the function above but this event listens for a click that will send to the completed array
function createTodoListHtml() {
    todoListContainer.innerHTML = "";

    todoList.forEach((Original) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = Original.task;
        todoContainer.className = "todo";
        todoContainer.addEventListener("click", () => {
            completedTasks.push(Original.task);

            //Local storage save
            saveTodos();
            createCompletedHtml();

            // Remove the task from todoList
            const index = todoList.indexOf(Original);
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
