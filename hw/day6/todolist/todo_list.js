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

// a function the updates the list length
function activeLength() {
    let counter = 0;
    todolist.forEach((task) => {
        if (!task.done) {
            counter++;
        }
    })
    return counter;
    //lengthElement.innerText = todolist.length +" tasks left";
}