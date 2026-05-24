import type { BoardState } from "@/types/BoardState";
import type { BoardAction } from "@/types/BoardAction";
import {
    addTaskToBoard,
    deleteTaskFromBoard,
    editTaskInBoard,
    moveTaskInBoard,
} from "@/lib/boardActions";

function boardReducer(state: BoardState, action: BoardAction): BoardState {
    switch (action.type) {
        case "task-added":
            return addTaskToBoard(state, action.columnId, action.taskTitle, action.taskText)
        case "task-deleted":
            return deleteTaskFromBoard(state, action.columnId, action.taskId)
        case "task-moved":
            return moveTaskInBoard(state, action.taskId, action.columnStatus)
        case "task-edited":
            return editTaskInBoard(state, action.columnId, action.taskId, action.taskTitle, action.taskText)
        case "board-reset":
            return action.board
    }
}

export { boardReducer };
