const taskForm = document.querySelector('.task'); //форм тасков
const taskInput = document.querySelector('.task__input'); // инпут заданий


const taskList = document.querySelector('.task__list'); // ul (обертка) тасков
const task = taskList.querySelectorAll('.task__items'); // таск который добавляется


const delTask = document.querySelector('.task__deleted'); // кнопка удаления таска
const cleaningList = document.querySelector('.del-btn'); // кнопка удаления ВСЕХ тасков

let array = []; // массив для тасков

renderTask (array, taskList);


function addTask (evt) {
    evt.preventDefault();

    if (taskInput.value.length >= 1) {
        array.push(taskInput.value);

        taskInput.value = '';
    }

    renderTask(array, taskList);
}

function deleteAll() {
    array.splice(0,array.length);

    renderTask(array, taskList);
}

function renderTask (array, container) {
    let htmlTasks = '';

    if (array.length > 0) {
        cleaningList.classList.remove('hidden');
    } else {
        cleaningList.classList.add('hidden');
    }

    for (let i = 0; i < array.length; i++) {
        htmlTasks += `<div class="task__items"><li class="task__item">${array[i]}</li><button type="button" class="task__deleted" onclick="deleteTask(${i})"></button></div>`;
    }

    container.innerHTML = htmlTasks;
}

function deleteTask (index) {
    let resultArray = [];

    for (let i = 0; i < array.length; i++) {
        if (index !== i) {
            resultArray.push(array[i]);
        }
    }

    array = resultArray;

    renderTask(array, taskList);
}

taskForm.addEventListener('submit', addTask);
cleaningList.addEventListener('click', deleteAll);