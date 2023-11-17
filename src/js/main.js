import "./../scss/style.scss";

/*Arrayay*/

const numbers = [];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
    
}

for (let i = 0; i < numbers.length; i++) {
    const div = document.createElement("div");
    
    document.body.appendChild(div);
}

const todoList = ["Watch Soccer", "Take out the trash", "Book a dentist appointment", "Call the broker"];

const completedTasks = [];

const todoListContainer = document.querySelector("section#products");

todoList.forEach((todo) => {
    const todoContainer = document.createElement("div");
    const title = document.createElement("h3");

    title.innerHTML = todo;
    todoContainer.className = "todo";
    todoContainer.addEventListener("click", () => {
        completedTasks.push(todo);
        console.log(completedTasks);
        createCompletedHtml();
    });
    todoContainer.appendChild(title);
    todoListContainer.appendChild(todoContainer);
});

    const completedContainer = document.querySelector("section#cart");

    const createCompletedHtml = () => {
        completedContainer.innerHTML = "";

        completedTasks.forEach((completedItem, i) => {
            const todoContainer = document.createElement("div");
            const title = document.createElement("h3");

            title.innerHTML = completedItem;
            todoContainer.className = "todo";

            todoContainer.addEventListener("click", () =>{
                completedTasks.splice(i, 1);
                createCompletedHtml();
            });

            todoContainer.appendChild(title);
            completedContainer.appendChild(todoContainer);

        });
        
    }

