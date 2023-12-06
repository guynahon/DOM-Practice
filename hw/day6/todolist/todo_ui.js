// creating the static DOM elements variables.
const inputElement = document.getElementById("new-todo");
const listElement = document.getElementById("todo-list");
const clearButtonElement = document.getElementById("clear-done");
const lengthElement = document.getElementById("length");
const filtersElement = document.getElementById("filters");
const toggleAllElement = document.getElementById("toggle-all");
const body = document.getElementsByTagName("body");

function isDOM(Obj) {

    // Function that checks whether
    // object is of type Element
    return Obj instanceof Element;
}


// event listener for the input Element that allows you to add tasks to the list.
inputElement.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const title = inputElement.value;
        addItem(title);
        renderList();
        inputElement.value = "";
        updateActiveLength();
    }
});

// event listener for the clear button
clearButtonElement.addEventListener("click", function() {
    clearCompleted();
    renderList();
    updateActiveLength();
});

// toggle all - marks or un marks all the lines checkboxes
toggleAllElement.addEventListener("change", () => {
    todolist.forEach((task) => {
        task.done = toggleAllElement.checked;
    });
    renderList();
    updateActiveLength();
});


// when this function is called it updates the list to the current state.
function renderList() {
    //init the input bar to empty
    listElement.innerHTML = '';


    // if the to do length is less than 1 do not show main+footer
    if (todolist.length > 0) {
        document.getElementById("main").removeAttribute("style");
        document.getElementById("footer").removeAttribute("style");
    } else {
        document.getElementById("main").setAttribute("style", "display: none;");
        document.getElementById("footer").setAttribute("style", "display: none;");
    }


    todolist.forEach(function(item) {
        // creating <li> tag
        const line = document.createElement("li");
        // creating <div> tag
        const div = document.createElement("div");
        div.setAttribute("class", "view");


        // creating done check box <input> + toggle done or not done event listener
        const doneCheckBox = document.createElement("input");
        doneCheckBox.setAttribute("type", "checkbox");
        doneCheckBox.setAttribute("class", "toggle");
        doneCheckBox.addEventListener("change", function() {
            toggleDone(item.id);
            updateActiveLength();
        });

        // keeps the checkbox in the correct status when rendering the list
        doneCheckBox.checked = item.done;

        // creating destroy button <button> - remove the item from the list when pushed
        const destroy = document.createElement("button");
        destroy.setAttribute("class", "destroy");
        destroy.innerText = "";
        destroy.addEventListener("click", function () {
            removeItem(item.id);
            updateActiveLength();
            renderList();
        });



        // creating the label tag <label>
        const label = document.createElement("label");


        // creating the edit input <input>
        const edit = document.createElement("input");
        edit.setAttribute("class", "edit");


        // event listener that allows the user to edit an item from the list
        line.addEventListener("dblclick", () => {
            line.setAttribute("class", "editing");
            edit.setAttribute("value", item.title);
        });


        // an event listener the listens to the document and whenever pressing outside the input it submits the changes.
        document.addEventListener("click", (event) => {
            if (event.target.className !== "editing" &&
                line.classList.contains("editing") &&
                !edit.contains(event.target)) {

                item.title = edit.value;
                editItem(item.id, item.title);
                line.removeAttribute("class");
                renderList();
            }
        });


        // an event listener the listens to the edit element and when pressing Enter confirms the change.
        edit.addEventListener("keydown",(event) => {
            if (event.key === "Enter") {
                item.title = edit.value;
                editItem(item.id, item.title);
                line.removeAttribute("class");
                renderList();
            }
        });


        label.innerText = item.title;

        // building the <li> tree
        div.appendChild(label);
        div.appendChild(doneCheckBox);
        div.appendChild(destroy);
        line.appendChild(div);
        line.appendChild(edit);
        listElement.appendChild(line);
    });
}

function updateActiveLength() {
    lengthElement.innerText = activeLength() +" tasks left";
}
