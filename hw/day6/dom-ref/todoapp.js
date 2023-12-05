// Link the todolist logic to the UI
// practice the following:

// 2. add items to the list
// 3. remove items from the list
// 4. display the list

// you wiil need to practice the following:
// get elements from the document
// add event listeners to elements
// create elements with JS
// append and remove child elements

// FOR TOMORROW!
// Todolist with working UI that enable adding and removing items from the list

// BOUNS!
// 1. add a checkbox to each item


// REFERENCE:
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
// LOGIC.
// The brain of the app. or the engine of the app.

const todoList = [];

function addItemFromTitle(title) {}

function removeItemFromIndex(index) {}

function getTodoList() {}

// UI
// When the addItem button clicked, take the
// value from the input field and call the function addItem to list.
// Then, clear the input field, and display the list.

// Get reference to the button object and the input
const addItemButton = document.getElementById('addItemBtn');
const inputField = document.getElementById('userTextInput');
const todos = document.getElementById('todos');

// Add event listener to the button object
// the function will get the value from the input field
// and call the function addItemFromTitle
addItemButton.addEventListener('click', function() {
    const title = inputField.value;
    addItemFromTitle(title);
    renderTodoList();
})

// create new <li> elements for each item in the todoList
// and set the text to the title of the item
function renderTodoList() {
    // clen the <ul> element
    todos.innerHTML = '';

    todoList.forEach(function(todo) {

        // create <li></li> element
        const listEntry = document.createElement('li');


        listEntry.innerText = todo.title;

        // add the <li> element to the <ul> element
        todos.appendChild(listEntry);
    })
}