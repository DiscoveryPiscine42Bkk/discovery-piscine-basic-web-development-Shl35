window.onload = function() {
    loadTodos();
}

function newTodo() {
    const todoText = prompt("Enter new TO DO:");
    if (todoText && todoText.trim() !== "") {
        createTodo(todoText.trim());
        saveTodos();
    }
}

function createTodo(text) {
    const div = document.createElement("div");
    div.className = "todo";
    div.innerText = text;
    div.onclick = function() {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };
    const list = document.getElementById("ft_list");
    list.prepend(div);
}

function saveTodos() {
    const todos = [];
    const list = document.getElementById("ft_list").children;
    for (let item of list) {
        todos.push(item.innerText);
    }
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "todos") {
            try {
                const todos = JSON.parse(decodeURIComponent(value));
                for (let text of todos.reverse()) {
                    createTodo(text);
                }
            } catch(e) {}
        }
    }
}
