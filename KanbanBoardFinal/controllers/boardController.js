import boardModel from "../models/boardModel.js";

class BoardController {
    static addColumn(title) {
        boardModel.addColumn(title);
    }
    static removeColumn(columnId) {
        boardModel.removeColumn(columnId);
    }
    static addTask(columnId, taskTitle, taskDesc) {
        boardModel.addTask(columnId, taskTitle, taskDesc);
    }
    static removeTask(columnId, taskId) {
        boardModel.removeTask(columnId, taskId);
    }
    static moveTask(taskId, sourceColumn, targetColumn, targetTask) {

        boardModel.moveTask(taskId, sourceColumn, targetColumn, targetTask.getAttribute('column-id'));
    }
    static addSubscriber(subscriber) {
        boardModel.addSubscriber(subscriber);
    }
}

export default BoardController;