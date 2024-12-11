import BoardController from "./controllers/boardController.js";
import { BoardElement } from "./views/boardView.js";

// Adding Rendering function to subscribe to the Model

const board = BoardElement.getBoardContainer('drag-container');
BoardController.addSubscriber(board.renderBoard.bind(board));


//Event Listeners for adding task or removing column
const taskButton = document.querySelector('body');

taskButton.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (e.target.classList.contains('add-task')) {
        const enterTitle = prompt("Enter Title");
        const enterDesc = prompt("Enter Description");
        const columnId = targetElement.getAttribute('data-column-id');
        if (enterTitle === '') return;
        BoardController.addTask(columnId, enterTitle, enterDesc);
    }
    if (e.target.classList.contains('remove-container')) {
        const columnId = targetElement.getAttribute('data-column-id');
        const isDeleted = prompt("Enter 'confirm' to delete the column");
        if (isDeleted === 'confirm') BoardController.removeColumn(columnId);
    }
});

//Event Listener for adding the Column
const addColumn = document.getElementById('add-column');
addColumn.addEventListener('click', (e) => {
    const colTitle = prompt("Enter Column Title");
    if (colTitle !== '' && colTitle !== null) BoardController.addColumn(colTitle);
});






