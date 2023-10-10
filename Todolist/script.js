document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const newTodoTitleInput = document.getElementById("new-todo-title");
    const submitButton = document.getElementById("submit-button");

    
    function generateUniqueId() {
        return Date.now();
    }

   
    function fetchAndDisplayTodos() {
        fetch("https://futuristic-balsam-situation.glitch.me/api/todos")
            .then(response => response.json())
            .then(data => {
                
                todoList.innerHTML = "";

                data.forEach(todo => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Title: ${todo.title}, ID: ${todo.id}, Done: ${todo.isDone}`;
                    todoList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching todos:", error));
    }

  
    fetchAndDisplayTodos();

    
    function addNewTodo() {
        const newTodoTitle = newTodoTitleInput.value;

        if (newTodoTitle.trim() === "") {
            alert("Please enter a valid todo title.");
            return;
        }

       
        const newTodoId = generateUniqueId();

        const requestBody = JSON.stringify({ id: newTodoId, title: newTodoTitle });

        fetch("https://futuristic-balsam-situation.glitch.me/api/todos",   {
            mode: 'cors',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        })
            .then(response => response.json())
            .then(data => {
               
                newTodoTitleInput.value = "";

               
                fetchAndDisplayTodos();
            })
            .catch(error => console.error("Error adding todo:", error));
    }

   
    submitButton.addEventListener("click", addNewTodo);
});
