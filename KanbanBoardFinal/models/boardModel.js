import Factory from '../utils/boardFactory.js';
class BoardModel {
    constructor() {
        if (BoardModel.state) return BoardModel.state;
        this.columns = [];
        this.subscribers = [];
        BoardModel.state = this;
    }

    addColumn(title) {
        const column = Factory.createColumn(title);
        this.columns.push(column);
        this.notify();
    }

    addTask(columnId, taskTitle, taskDesc) {
        const column = this.columns.find(col => col.id === columnId);

        if (column) {
            const task = Factory.createTask(taskTitle, taskDesc);
            column.tasks.push(task);
            this.notify();
        }
    }

    removeTask(columnId, taskId) {
        const column = this.columns.filter(col => col.id === columnId);
        if (column) {
            column.tasks = column.tasks.filter(task => task.id !== taskId);
            this.notify();
        }
    }

    moveTask(taskId, sourceColumn, targetColumn, targetTask) {
        const sourceCl = this.columns.find(col => col.id === sourceColumn);
        const targetCl = this.columns.find(col => col.id === targetColumn);
        const taskIndex = sourceCl.tasks.findIndex(task => task.id === taskId);

        let targetIndex = targetCl ? targetCl.tasks.findIndex(task => task.id === targetTask) : 0;

        if (taskIndex < 0 || targetIndex < 0) {
            targetIndex = 0;
        }
        const [task] = sourceCl.tasks.splice(taskIndex, 1);
        console.log(task);
        if (targetIndex > -1) targetCl.tasks.splice(targetIndex, 0, task);

        this.notify();



    }

    removeColumn(index) {
        this.columns.splice(index, 1);
        this.notify();
    }

    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }

    notify() {
        this.subscribers.forEach(subscriber => subscriber(this.columns));
    }

}

const boardModel = new BoardModel();
export default boardModel;