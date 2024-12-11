import BoardController from "../controllers/boardController.js";
class BoardView {
    constructor(boardElement) {
        this.boardContainer = boardElement;
        this.dragoverEl = null;
    }

    renderBoard(columns) {
        let fragment = document.createDocumentFragment();
        this.boardContainer.innerHTML = '';
        columns.forEach(column => {
            const liColumn = document.createElement('li');
            liColumn.classList.add('drag-column');

            liColumn.innerHTML = `
                <h2>${column.title}</h2>
                <button class='add-task' data-column-id='${column.id}'>Add Task</button>
                <button class='remove-container' data-column-id='${column.id}'>X</button>
            `;
            liColumn.setAttribute('data-column-id', column.id);
            const tasks = this.renderTasks(column, liColumn);
            liColumn.appendChild(tasks);
            liColumn.classList.add('col');
            liColumn.addEventListener('dragover', (e) => this.dragOver(e, liColumn));
            liColumn.addEventListener('drop', (e) => this.dropEvent(e, column.id));
            fragment.append(liColumn);
        });
        this.boardContainer.appendChild(fragment);

        fragment = null;
    }

    renderTasks(column, liColumn) {
        let fragment = document.createDocumentFragment();
        if (column.tasks.length === 0) return fragment;
        const tasks = document.createElement('ul');
        tasks.classList.add('drag-item-list');
        column.tasks.forEach((task) => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.textContent = task.title;
            li.setAttribute('column-id', column.id);
            li.setAttribute('task-id', task.id);
            li.setAttribute('draggable', true);
            li.addEventListener('dragstart', (e) => {
                const dragStart = this.dragStart.bind(this, e, column.id, task.id);
                dragStart();
            });

            li.addEventListener('dragend', this.dragEnd);
            tasks.appendChild(li);
        });
        fragment.append(tasks);
        return fragment;
    }

    dragStart(event, columnId, taskId) {
        event.dataTransfer.setData('text/plain', JSON.stringify({
            columnId: columnId,
            taskId: taskId
        }));
        event.target.classList.add('isdragging');
        event.dataTransfer.effectAllowed = 'move';
    }

    dragEnd(event) {
        event.target.classList.remove('isdragging');
        event.dataTransfer.effectAllowed = 'move';
    }

    dragOver(event, liColumn) {
        event.preventDefault();
        const targetTask = this.getHoveredTask(event, liColumn);
        if (targetTask) this.dragoverEl = targetTask;
        this.highlightDropPosition(targetTask, event.clientY);
        event.dataTransfer.dropEffect = 'move';
    }


    getHoveredTask(event, liColumn) {
        const tasks = Array.from(liColumn.querySelectorAll('.task'));
        return tasks.find((task) => {
            const rect = task.getBoundingClientRect();
            return event.clientY >= rect.top && event.clientY <= rect.bottom;
        });
    }

    dropEvent(event, columnId) {
        event.preventDefault();
        this.clearHighlight();

        const data = JSON.parse(event.dataTransfer.getData('text/plain'))
        if (data.columnId !== columnId) {
            BoardController.moveTask(data.taskId, data.columnId, columnId, this.dragoverEl);
        }
    }

    highlightDropPosition(targetTask, clientY) {
        this.clearHighlight();

        if (targetTask) {
            const rect = targetTask.getBoundingClientRect();
            if (clientY < rect.top + rect.height / 2) {
                targetTask.style.borderTop = '2px solid blue';
            } else {
                targetTask.style.borderBottom = '2px solid blue';
            }
        }
    }

    clearHighlight() {
        document.querySelectorAll('.task').forEach((task) => {
            task.style.borderTop = '';
            task.style.borderBottom = '';
        });
    }


}

export class BoardElement {

    static getBoardContainer(boardId) {
        const boardEl = document.getElementById(boardId);
        if (boardEl) return new BoardView(boardEl);

    }
}

