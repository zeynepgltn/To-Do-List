const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

loadItems();

document.addEventListener("DOMContentLoaded", function () {
    eventListeners();
});

//load items
function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    });
}

//get items from LS
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//set items to LS
function setItemToLS(newToDo) {
    todos = getItemsFromLS();
    todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//create item
function createItem(newToDo) {
    //li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item new-task";
    li.appendChild(document.createTextNode(newToDo));

    //a oluşturma
    const a = document.createElement("a");
    a.className = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    //a ile liyi birleştirme
    li.appendChild(a);
    //yeni oluşturulan liyi taskliste ekle
    taskList.appendChild(li);
}

//event 
function eventListeners() {
    form.addEventListener("submit", addNewItem);
    taskList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

//add new item  
function addNewItem(e) {
    e.preventDefault();
    if (input.value === "") {
        alert("Please enter a task");
        //console.log("submit");
    }
    createItem(input.value);
    setItemToLS(input.value);
    input.value = "";
}

//delete item
function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteToDoFromStorage(deleteToDo) {
    let todos = getItemsFromLS();
    todos.forEach(function (item, index) {
        if (item === deleteToDo) {
            todos.splice(index, 1);
        }
    });
    //son hal gider
    localStorage.setItem("todos", JSON.stringify(todos));
}

//delete all items
function deleteAllItems(e) {
    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
        /* Array.from(taskList.children).forEach((item) => {
            item.remove();
        }); */
        /* taskList.innerHTML = ""; */
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
    localStorage.clear();
    e.preventDefault();
}