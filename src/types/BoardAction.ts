import type { BoardState } from "./BoardState";
import type { ColumnStatus } from "./ColumnStatus";

export type BoardAction =
    | { type: "task-added"; columnId: string, taskTitle: string, taskText: string }
    | { type: "task-deleted"; columnId: string, taskId: string }
    | { type: "task-moved"; taskId: string, columnStatus: ColumnStatus }
    | { type: "task-edited"; columnId: string, taskId: string, taskTitle: string, taskText: string }
    | { type: "board-reset"; board: BoardState };
