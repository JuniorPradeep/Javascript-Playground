import Factory from '../utils/kanbanFactory.js';
class State {
    constructor() {
        if (State.instance) return State.instance;
        this.columns = [];
        this.subscrbers = [];
        State.instance = this;
    }

    addTask(columnId, taskTitle, taskDescription) {

        const column = this.columns.find((col) => col.id === columnId);
        if (column) {
            const task = Factory.createTask(taskTitle, taskDescription);
            column.tasks.push(task);
            this.notify();
        }
    }

    removeTask(columnId, taskId) {
        const column = this.columns.find(col => col.id === columnId);
        if (column) {
            column.tasks = column.tasks.filter(task => task.id !== taskId)
            this.notify();
        }

    }

    addColumn(column) {
        this.columns.push(column);
        this.notify();
    }

    removeColumn(index) {
        this.columns.splice(index, 1);
        this.notify();
    }

    addSubscriber(subscriber) {
        this.subscrbers.push(subscriber);
    }

    notify() {

        this.subscrbers.forEach((subscrber) => {
            subscrber(this.columns);
        });

    }

}

const globalState = new State();
export default globalState; 