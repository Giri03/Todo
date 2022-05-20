let listsContainer = document.querySelector('.task-list');
let newTaskForm = document.querySelector('[data-new-task-form]');
let addTaskInput = document.querySelector('.add-task-input');

let listElement = document.querySelector('[data-checkcircle]');

let todoList = [{
    id: 1,
    name: 'Some task',
    isCompleted: false
}];

/** 
 * On add button click
 * adds name to todoList with unique id 
 * and mark it as not complete
 */
newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const list_name = addTaskInput.value;
    if (list_name === null || list_name == undefined) return;
    const list = createTodo(list_name);
    addTaskInput.value = null;
    todoList.push(list);
    render();
});

/** 
 * @param list_name is a string of todo item name
 * create object for todoList 
 */
let createTodo = (list_name) => {
    return {
        id: Date.now().toString(),
        name: list_name,
        isCompleted: false
    }
}

/** Renders todoList and creates list */
let render = () => {
    clearElement(listsContainer);
    todoList.forEach((list) => {

        /** create li element */
        const listElement = document.createElement('li');
        listElement.classList.add('task');
        listElement.id = list.id;

        /** append checkcircle icon in li tag */
        const checkElement = document.createElement('span');
        checkElement.innerHTML = '<i class="fa fa-circle-o" data-checkcircle="true"></i>';
        listElement.appendChild(checkElement);

        /** append todo item name in li tag */
        const textElement = document.createElement('span');
        textElement.classList.add('list-name');
        textElement.innerText = list.name;
        listElement.appendChild(textElement);

        /** append cross icon in li tag */
        const deleteElement = document.createElement('span');
        deleteElement.innerHTML = '<i class="fa fa-times" data-cross="true" aria-hidden="true"></i>';
        listElement.appendChild(deleteElement);

        /** append li element in ul tag(task container) */
        listsContainer.appendChild(listElement);
    });
    setTaskCount();
}

/**
 * @param element 
 * 
 * Removes all child components from passed element
 */
let clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

/**
 * Listens to click event of task-container (ul tag)
 * On checkcircle click - marks task as completed
 * On cross click - delete the task
 */
listsContainer.addEventListener('click', e => {
    if (!!e.target.dataset.checkcircle) {
        let listNameElement = e.target.parentNode.nextElementSibling;
        let id = e.target.parentNode.parentNode.id;
        let index = todoList.findIndex(todo => todo.id == id);
        if (e.target.classList.contains('fa-circle-o')) {
            todoList[index].isCompleted = true;
            listNameElement.classList.add('completed');
            e.target.classList.remove('fa-circle-o');
            e.target.classList.add('fa-check-circle');
        } else if (e.target.classList.contains('fa-check-circle')) {
            todoList[index].isCompleted = false;
            listNameElement.classList.remove('completed')
            e.target.classList.add('fa-circle-o');
            e.target.classList.remove('fa-check-circle');
        }
        setTaskCount();
    }

    if (!!e.target.dataset.cross) {
        const id = e.target.parentNode.parentNode.id;
        todoList = todoList.filter(x => x.id != id);
        e.target.parentNode.parentNode.remove();
        setTaskCount();
    }
});

/**
 * set remaining task count and update in html
 */
let setTaskCount = () => {
    let remaningTasks = todoList.filter(todo => !todo.isCompleted).length;
    document.querySelector('.task-count').innerText = `Remaning tasks: ${remaningTasks}`;
}

render();