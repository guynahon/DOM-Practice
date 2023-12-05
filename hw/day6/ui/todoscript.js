const todolist = [];

function addItem(title) {
    let id;
    if (todolist.length === 0) {
        id = 1;
    } else {
        id = todolist[todolist.length - 1].id + 1;
    }
    todolist.push({
        "title": title,
        "id": id,
        "done": false
    });
}

function removeItem(itemId) {
    const index = getIndex(itemId);
    if (index === -1) {
        //console.log(`can not removeItem - item id ${itemId} do not exist!`);
        return;
    }
    console.log(index);
    const removedItem = todolist[index];
    todolist.splice(index, 1);
    return removedItem;
}

function toggleDone(itemId) {
    const index = getIndex(itemId);
    if (index === -1) {
        //console.log(`can not toggleDone - item id ${itemId} do not exist!`);
        return;
    }
    todolist[index].done = !todolist[index].done;
}

function editItem(itemId, newTitle) {
    const index = getIndex(itemId);
    if (index === -1) {
        //console.log(`can not editItem - item id ${itemId} do not exist!`);
        return;
    }
    todolist[index].title = newTitle;
}

function clearAllItems() {
    todolist.splice(0, todolist.length);
}

function getItems() {
    for (let task of todolist) {
        console.log(`title: ${task.title}, id: ${task.id}, done: ${task.done}`);
    }
}

function getIndex(itemId) {
    return todolist.findIndex((item) => itemId === item.id);
}

function clearCompleted() {
    for (let i = todolist.length - 1; i >= 0; i--) {
        if (todolist[i].done) {
            todolist.splice(i, 1);
        }
    }
}


const taskInput = document.getElementById("new-todo");
const addItemButton = document.getElementById("addItemButton");
const todos = document.getElementById("todo-list");
const clearDoneButton = document.getElementById("clear-done");
const tasksLength = document.getElementById("length");

addItemButton.addEventListener("click", function(){
    const title = taskInput.value;
    addItem(title);
    renderList();
    taskInput.value = "";
    updateLength();
});

taskInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const title = taskInput.value;
        addItem(title);
        renderList();
        taskInput.value = "";
        updateLength();
    }
});

clearDoneButton.addEventListener("click", function() {
    clearCompleted();
    renderList();
    updateLength();
})


function renderList() {
    todos.innerHTML = '';
    todolist.forEach(function(item) {
        const title = item.title;
        const line = document.createElement("li");
        const div = document.createElement("div");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "checkboxes");
        checkBox.addEventListener("change", function() {
            toggleDone(item.id);
        });
        const destroy = document.createElement("button");
        destroy.setAttribute("class", "destroy");
        destroy.innerText = "";
        destroy.addEventListener("click", function () {
            removeItem(item.id);
            updateLength();
            renderList();
        })
        const label = document.createElement("label");
        label.innerText = title;
        div.appendChild(label);
        div.appendChild(checkBox);
        div.appendChild(destroy);
        line.appendChild(div);
        todos.appendChild(line);
    })
}





// another way!
/*function renderList2() {
    todos.innerHTML = "";
    todolist.forEach(item => function () {
        const html = ` // this sign is next to the key 1/!
                        <li>
                            <div class="view">
                                <input class="toggle"
                                        checked={item.done}
                                        type="checkbox" />
                                <label>{item.title}</label>
                                <button class="destroy" onclick={removeItem(item.id)}/>
                            </div>
                            <input class="edit" />
                        </li>
                        `

    });
}*/





function updateLength() {
    tasksLength.innerText = todolist.length +" tasks left";
}
