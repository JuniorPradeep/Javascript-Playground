const taskContainer = document.getElementById('taskcontainer');
const dragList = document.querySelector('.drag-list');
const backlog = document.querySelector('backlog');
const backlogContent = document.getElementById('backlog-content');

const addContainer = document.querySelector('.add-container');
const addItem = document.querySelector('.add-item');


const dragItemList = document.querySelectorAll('.drag-item-list');
console.log(dragItemList);

//List Items

const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completedList = document.getElementById('completed-list');
const holdList = document.getElementById('hold-list');


let backlogListArr = [];
let progressListArr = [];
let completedListArr = [];
let holdListArr = [];
let listArrays = [];


let draggedElement;
let draggedOver;

function getStorageItems() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArr = JSON.parse(localStorage.backlogItems);
        progressListArr = JSON.parse(localStorage.progressItems);
        completedListArr = JSON.parse(localStorage.completeItems);
        holdListArr = JSON.parse(localStorage.holdItems);
    } else {
        backlogListArr = ['will do clean stuff', 'test automation']
        progressListArr = ['progressing stuff', 'prgress ']
        completedListArr = ['cool stuff', 'all done']
        holdListArr = ['later do']
    }
}

getStorageItems();

function UpdateStorageData() {
    listArrays = [backlogListArr, progressListArr, completedListArr, backlogListArr];
    const arrayNames = ['backlog', 'progress', 'complete', 'hold'];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });
}
UpdateStorageData();

//Dropping Item
// dragItemList.forEach(dragItem => {
//     dragItem.addEventListener('dragover', e => {
//         e.preventDefault();
//         e.target.classList.add('over');
//         draggedOver = e.target.classList;
//     });

//     dragItem.addEventListener('dragleave', e => {
//         draggedElement.classList.remove('over');
//         draggedOver.classList.remove('over');
//     });
//     dragItem.addEventListener('drop', dropItem);
// });

//Drop Item
function dropItem(e) {
    dragItemList.forEach(dragItem => {
        dragItem.classList.remove('over');
    });
}

function createItemEl(fragment, item, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('drag-item');
    listItem.innerText = item;
    listItem.draggable = true;
    listItem.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        draggedElement.classList.add('dragging');
    });
    listItem.addEventListener('dragend', e => {
        listItem.classList.remove('dragging');
    });
    listItem.addEventListener('dragleave', e => {
        e.target.classList.remove('over');
    });
    listItem.addEventListener('dragover', e => {
        e.preventDefault();
        e.target.classList.add('over');
    });
    listItem.addEventListener('drop', e => {
        e.preventDefault();
        e.target.classList.remove('over');
        draggedElement.classList.remove('dragging');
        const parent = e.target.parentElement;
        parent.insertBefore(draggedElement, listItem);
        draggedElement = null;

    });

    fragment.append(listItem);
    return fragment;
}


function renderElement(listElement, listItems) {
    listElement.innerHTML = '';
    let fragment = document.createDocumentFragment();
    listItems.forEach((item, index) => {
        fragment = createItemEl(fragment, item, index);
    });
    console.log(fragment);
    listElement.appendChild(fragment);
}

function renderDom() {

    getStorageItems();

    // Backlogs
    renderElement(backlogList, backlogListArr);

    //Progress
    renderElement(progressList, progressListArr);

    //Completed
    renderElement(completedList, completedListArr);

    //Hold
    renderElement(holdList, holdListArr);

}

renderDom();



const add = document.querySelector('.add');
const save = document.querySelector('.save');