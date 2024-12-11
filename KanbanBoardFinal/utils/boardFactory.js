class KanbanBoardFactory {

    static createColumn(title) {
        return {
            id: `col-${Date.now()}`,
            title: title,
            tasks: []
        }

    }

    static createTask(taskTitle, taskDesc) {
        return {
            id: `task-${Date.now()}`,
            title: taskTitle,
            description: taskDesc
        }

    }

}

export default KanbanBoardFactory;