import Factory from '../utils/kanbanFactory';
import globalState from '../models/state';
class BoardController {
    static addColumn(title) {
        const column = Factory.createColumn(title);
        globalState.addColumn(column);
    }
    static addTask(columnId, taskTitle, taskDescription) {
        globalState.addTask(columnId, taskTitle, taskDescription);
    }

}

export default BoardController;