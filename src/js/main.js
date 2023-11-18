import "./../scss/style.scss";


const todoList = ["Watch Soccer", "Take out the trash", "Book a dentist appointment", "Call the broker"];

const completedTasks = [];

            // Create a hook to the tasks and completed task ID's
const todoListContainer = document.getElementById("themTasks");
const completedContainer = document.getElementById("themFinished");

//First Function
function createCompletedHtml() {
    completedContainer.innerHTML = "";

    completedTasks.forEach((completedItem, i) => {
        const todoContainer = document.createElement("div");
        const title = document.createElement("h3");

        title.innerHTML = completedItem;
        todoContainer.className = "todo";

        todoContainer.addEventListener("click", () => {
            // Move the task back to the to-do list
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

//Second Function
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
