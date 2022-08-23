const taskForm = document.querySelector('.task'); //форм тасков
const taskInput = document.querySelector('.task__input'); // инпут заданий

const taskList = document.querySelector('.task__list'); // ul (контейнер) тасков

const cleaningList = document.querySelector('.del-btn'); // кнопка удаления ВСЕХ тасков

let mainArray = []; // массив для тасков


renderTask();


function renderTask (array = mainArray, container = taskList) {
    let htmlTasks = '';

    if (array.length > 0) {
        cleaningList.classList.remove('hidden');
    } else {
        cleaningList.classList.add('hidden');
    }

    for (let i = 0; i < array.length; i++) {
        htmlTasks += `<div class="task__items" id="task__div_${i}">
                         <li class="task__item">${array[i]}</li>
                         <input class="task__input hidden-item" type="text">
                         <div class="button__container">
                             <button type="button" class="task__edit" onclick="editTask(${i})"></button>
                             <button type="button" class="task__deleted" onclick="deleteTask(${i})"></button>
                         </div>
                       </div>`;
    }

    container.innerHTML = htmlTasks;
}

function addTask (evt) {
    evt.preventDefault();

    if (taskInput.value.length >= 1) {
        mainArray.push(taskInput.value);
        renderTask();
    }

    taskInput.value = '';
}

function deleteAll() {
    mainArray.splice(0,mainArray.length);

    taskInput.value = '';

    renderTask();
}

function deleteTask (index) {
    let resultArray = [];

    for (let i = 0; i < mainArray.length; i++) {
        if (index !== i) {
            resultArray.push(mainArray[i]);
        }
    }

    mainArray = resultArray;

    renderTask();
}

function editTask (index) {

    const idItem = document.querySelector(`#task__div_${index}`);
    const indexTextContent = idItem.querySelector('.task__item');
    const indexInput = idItem.querySelector('.task__input');
    const editButton = idItem.querySelector('.task__edit');

    if (!indexTextContent.classList.contains('hidden-item')) {
        indexInput.value = indexTextContent.textContent;
        indexTextContent.classList.add('hidden-item');
        indexInput.classList.remove('hidden-item');
        indexInput.focus()
        editButton.style.backgroundImage = 'url(bg-close-button.svg)';
    } else {
        mainArray[index] = indexInput.value;
        renderTask()
    }

    indexInput.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 13) {
            mainArray[index] = indexInput.value;
            renderTask()
        }
    });

}


taskForm.addEventListener('submit', addTask);
cleaningList.addEventListener('click', deleteAll);