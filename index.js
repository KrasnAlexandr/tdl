const taskForm = document.querySelector('.task'); //форм тасков
const taskInput = document.querySelector('.task__input'); // инпут заданий

const taskList = document.querySelector('.task__list'); // ul (контейнер) тасков

const cleaningList = document.querySelector('.del-btn'); // кнопка удаления ВСЕХ тасков

const templateElement = document.querySelector('.template').content;

let mainArray = []; // массив для тасков


// добавление таска
function addTask (evt) {
    evt.preventDefault();

    if (taskInput.value.length >= 1) {
        const newTask = { text: taskInput.value, complete: false  };
        mainArray.push(newTask);
        renderHTML(renderTask(newTask.text, counterIndex(), newTask.complete))
    }

    taskInput.value = '';
}

//создание обертки таска
function renderTask (taskText, taskIndex, taskComplete) {

    const newTask = templateElement.cloneNode(true);

    const paragraph = newTask.querySelector('.task__text');
    paragraph.textContent = taskText;

    newTask.querySelector('.task__items').setAttribute('id', `task__id_${taskIndex}`)
    newTask.querySelector('.task__deleted').setAttribute('onclick',`deleteTask(${taskIndex})`);
    newTask.querySelector('.task__edit').setAttribute('onclick',`editTask(${taskIndex})`);
    newTask.querySelector('.task__checkbox').setAttribute('onclick',`completeTask(${taskIndex})`);

    const checkBox = newTask.querySelector('.task__checkbox');

    if (taskComplete === true) {
        checkBox.setAttribute('checked', 'checked')
        paragraph.style.color = 'red';
        paragraph.style.textDecoration = 'line-through';
    }



    return newTask;
}


// добавление таска в DOM
function renderHTML (task, container = taskList) {
    container.prepend(task)
}

// счетчик для индекса
function counterIndex () {
    let taskIndex = 0;

    for (let i = 0; i < mainArray.length; i++) {
        taskIndex = i;
    }

    return taskIndex;
}

// удалить всё
function deleteAll() {
    mainArray = [];

    taskInput.value = '';

    taskList.innerHTML = '';
}

// удалить конекретный таск
function deleteTask (taskIndex) {
    let resultArray = [];

    for (let i = 0; i < mainArray.length; i++) {
        if (taskIndex !== i) {
            resultArray.push(mainArray[i]);
        }
    }

    mainArray = resultArray;

    taskList.innerHTML = '';

    mainArray.forEach((task, index) => renderHTML(renderTask(task.text, index, task.complete)));
}

//редактировать конкретный таск
function editTask (taskIndex) {

    const idItem = document.querySelector(`#task__id_${taskIndex}`);
    const indexTextContent = idItem.querySelector('.task__text');
    const indexInput = idItem.querySelector('.task__input');
    const editButton = idItem.querySelector('.task__edit');
    const checkBox = idItem.querySelector('.task__checkbox');

    if (!indexTextContent.classList.contains('hidden-item')) {
        indexInput.value = indexTextContent.textContent;
        indexTextContent.classList.add('hidden-item');
        checkBox.classList.add('hidden-item');
        indexInput.classList.remove('hidden-item');
        indexInput.focus()
        editButton.style.backgroundImage = 'url(bg-close-button.svg)';
    } else {
        mainArray[taskIndex].text = indexInput.value;
        taskList.innerHTML = '';
        mainArray.forEach((task, index) => renderHTML(renderTask(task.text, index, task.complete)));
        checkBox.classList.remove('hidden-item');
    }

    indexInput.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 13) {
            mainArray[taskIndex].text = indexInput.value;
            taskList.innerHTML = '';
            mainArray.forEach((task, index) => renderHTML(renderTask(task.text, index, task.complete)));
            checkBox.classList.remove('hidden-item');
        }
        if (evt.keyCode === 27) {
            indexTextContent.classList.remove('hidden-item');
            indexInput.classList.add('hidden-item');
            checkBox.classList.remove('hidden-item');
        }
    });
}

// чекбокс таска
function completeTask (taskIndex) {

    const idItem = document.querySelector(`#task__id_${taskIndex}`);
    const indexTextContent = idItem.querySelector('.task__text');
    const checkBox = idItem.querySelector('.task__checkbox');

    checkBox.addEventListener('change', function () {
        if (checkBox.checked) {
            mainArray[taskIndex].complete = true;
            indexTextContent.style.color = 'red';
            indexTextContent.style.textDecoration = 'line-through';
        } else {
            mainArray[taskIndex].complete = false;
            indexTextContent.style.color = 'white';
            indexTextContent.style.textDecoration = 'none';
        }
    })
}


taskForm.addEventListener('submit', addTask);  // кнопка добавление
cleaningList.addEventListener('click', deleteAll); // кнопка удаления всего

