// creating the static DOM elements variables.
const inputElement = document.getElementById("new-todo");
const listElement = document.getElementById("todo-list");
const lengthElement = document.getElementById("length");
const filtersElement = document.getElementById("filters");
const toggleAllElement = document.getElementById("toggle-all");
const footerElement = document.getElementById("footer");

// event listener for the input Element that allows you to add tasks to the list.
inputElement.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && inputElement.value.trim() !== "") {
        const title = inputElement.value;
        addItem(title);
        renderList();
        inputElement.value = "";
        updateActiveLength();
    }
});

// toggle all - marks or unmarks all the lines checkboxes
toggleAllElement.addEventListener("change", () => {
    todolist.forEach((task) => {
        task.done = toggleAllElement.checked;
    });
    renderList();
    updateActiveLength();
});


// filtering the list by the ALL/ACTIVE/COMPLETED values
filtersElement.addEventListener("click", (event) => {
    const target = event.target;
    if (target.innerHTML === "All" || target.innerHTML === "Active" || target.innerHTML === "Completed") {
        const selectedElement = document.getElementsByClassName("selected")[0];
        selectedElement.removeAttribute("class");
        target.setAttribute("class", "selected");
    }
    renderList()
});


// clear button creation
const clearCompletedButton = document.createElement("button");
clearCompletedButton.setAttribute("id", "clear-done");
clearCompletedButton.setAttribute("class", "clear-completed");
clearCompletedButton.innerHTML = "Clear completed";


// clear completed button event listener - clears all completed tasks
clearCompletedButton.addEventListener("click", function() {
    clearCompleted();
    renderList();
    updateActiveLength();
});

// when this function is called it updates the list to the current state.
function renderList() {
    //init the input bar to empty
    listElement.innerHTML = '';

    // if the to-do list length is less than 1 do not show #main and #footer
    if (todolist.length > 0) {
        document.getElementById("main").removeAttribute("style");
        footerElement.removeAttribute("style");
    } else {
        document.getElementById("main").setAttribute("style", "display: none;");
        footerElement.setAttribute("style", "display: none;");
    }


    //clear-completed
    // remove the existing clear completed button if exists
    if (footerElement.contains(clearCompletedButton)) {
        footerElement.removeChild(clearCompletedButton);
    }

    // check if the button should be previewed
    if (filterDoneLength() >= 1) {
        footerElement.appendChild(clearCompletedButton);
    }

    // getting the selected class element (to later check if the line is hidden ot not)
    const selected = document.getElementsByClassName("selected")[0];

    // visiting each task in the to-do list
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
            renderList();
        });

        // keeps the checkbox in the correct status when rendering the list
        doneCheckBox.checked = item.done;

        // checks the value that we got at the filtersElement EventListener and hide the needed lines
        hideLines(doneCheckBox, selected, line);

        // update the class on each line to completed if the line is checked
        addCompleted(doneCheckBox, line);

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
                !edit.contains(event.target) &&
                edit.value.trim() !== "") {

                item.title = edit.value;
                editItem(item.id, item.title);
                line.removeAttribute("class");
                renderList();
            }
        });

        // an event listener the listens to the edit element and when pressing Enter confirms the change.
        edit.addEventListener("keydown",(event) => {
            if (event.key === "Enter" && edit.value.trim() !== "") {
                item.title = edit.value;
                editItem(item.id, item.title);
                line.removeAttribute("class");
                renderList();
            }
        });

        // changes the lines text to the task title
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

// updates the length element to the active tasks length
function updateActiveLength() {
    lengthElement.innerText = activeLength() +" tasks left";
}

// checks the value that we got at the filtersElement EventListener and hide the needed lines
function hideLines(doneCheckBox, selected, line) {
    if (selected.innerHTML === "Active") {
        if(doneCheckBox.checked){
            line.classList.add("hidden");
        }
    } else if (selected.innerHTML === "Completed") {
        if (!doneCheckBox.checked) {
            line.classList.add("hidden");
        }
    }
}

// update the class on each line to completed if the line is checked
function addCompleted(doneCheckBox, line) {
    if (doneCheckBox.checked === true) {
        line.classList.add("completed");
    } else {
        line.classList.remove("completed");
    }
}
