export const userService  = {
    createUser,
    getAllUser,
    addTodo,
    getAllTodos,
    updateUser,
    updateTodo,
    RemoveDataFromLocalStorage,
}


async function createUser(user) {
    let users = localStorage.getItem('users') == null || localStorage.getItem('users') == 'null' ? [] : localStorage.getItem('users') ;
    users = users.length > 0 ? JSON.parse(users) : []
    if(users) {
        users.push({
            key: generateRandomNumber(),
            name: user.name,
            email: user.email
        })
    }
    localStorage.setItem('users',JSON.stringify(users));
    return users;
    
}

async function addTodo(todo) {
    let todos = localStorage.getItem('todos') == null || localStorage.getItem('todos') == 'null' ? [] : localStorage.getItem('todos') ;
    todos = todos.length > 0 ? JSON.parse(todos) : []
    if(todos) {
        todos.push({
            key: generateRandomNumber(),
            action: todo.action,
            date: todo.date
        })
    }
    localStorage.setItem('todos',JSON.stringify(todos));
    return todos;
    
}

async function getAllUser() {
    let users = localStorage.getItem('users');
    users = users.length > 0 ? JSON.parse(users) : [];
    return  users;
}

async function getAllTodos() {
    let todos = localStorage.getItem('todos');
    todos = todos.length > 0 ? JSON.parse(todos) : [];
    return  todos;
}

async function updateUser(user) {
    if (!user.key) return;
    let data = JSON.parse(localStorage.getItem("users"));
    var dataIndex = data.findIndex(x => x.key == user.key);
    if (dataIndex > -1) {
        data.splice(dataIndex, 1, user)
    }
    localStorage.setItem("users", JSON.stringify(data));
    return data;
}

async function updateTodo(todo) {
    if (!todo.key) return;
    let data = JSON.parse(localStorage.getItem("todos"));
    var dataIndex = data.findIndex(x => x.key == todo.key);
    if (dataIndex > -1) {
        data.splice(dataIndex, 1, todo)
    }
    localStorage.setItem("todos", JSON.stringify(data));
    return data;
}

async function RemoveDataFromLocalStorage(key, type) {
    var data = JSON.parse(localStorage.getItem(type));
    var dataIndex = data.findIndex(x => x.key == key);
    if (dataIndex > -1) {
        data.splice(dataIndex, 1)
    }
    localStorage.setItem(type, JSON.stringify(data));
    return data;
}

function generateRandomNumber() {
    var minimumValue = 1000;
    var maximumValue = 9000;
    var randomNumber = Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
    return randomNumber;
}