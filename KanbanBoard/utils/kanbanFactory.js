class KanbanBoardFactory {

    static createColumn(title) {
        return {
            id: `col-${Date.now()}`,
            title,
            tasks: [],
        };
    }

    static createTask(title, description) {
        return {
            id: `task-${Date.now()}}`,
            title: title,
            description: description,
        };
    }
}

export default KanbanBoardFactory;