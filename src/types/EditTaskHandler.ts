export type EditTaskHandler = (
    columnId: string,
    taskId: string,
    taskTitle: string,
    taskText: string,
) => void