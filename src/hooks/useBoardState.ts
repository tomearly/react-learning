import { useCallback, useEffect, useReducer } from "react"
import type { BoardState } from "@/types/BoardState"
import type { AddTaskHandler } from "@/types/AddTaskHandler"
import type { DeleteTaskHandler } from "@/types/DeleteTaskHandler"
import type { EditTaskHandler } from "@/types/EditTaskHandler"
import type { MoveToHandler } from "@/types/MoveToHandler"
import { saveBoardData, loadBoardData, clearBoardData } from "@/lib/boardStorage"
import sampleData from "@/data/kanban.json"
import { boardReducer } from "@/reducers/boardReducer"

const initialBoardData = sampleData as BoardState

const boardStorageKey = "kanban-board"

export function useBoardState() {
    const [boardData, dispatch] = useReducer(
        boardReducer,
        initialBoardData,
        (initialBoardData) => loadBoardData(boardStorageKey, initialBoardData)
    )
    useEffect(() => {
        saveBoardData(boardStorageKey, boardData)
    }, [boardData])

    const resetBoard = useCallback(() => {
        clearBoardData(boardStorageKey)
        dispatch({
            type: "board-reset",
            board: initialBoardData,
        })
    }, [])

    const addTask = useCallback<AddTaskHandler>((columnId, taskTitle, taskText) => {
        dispatch({
            type: "task-added",
            columnId,
            taskTitle,
            taskText,
        })
    }, [])

    const deleteTask = useCallback<DeleteTaskHandler>((columnId, taskId) => {
        dispatch({
            type: "task-deleted",
            columnId,
            taskId,
        })
    }, [])

    const moveToColumn = useCallback<MoveToHandler>((taskId, columnStatus) => {
        dispatch({
            type: "task-moved",
            taskId,
            columnStatus,
        })
    }, [])

    const editTask = useCallback<EditTaskHandler>((columnId, taskId, taskTitle, taskText) => {
        dispatch({
            type: "task-edited",
            columnId,
            taskId,
            taskTitle,
            taskText,
        })
    }, [])

    return {
        boardData,
        addTask,
        deleteTask,
        moveToColumn,
        editTask,
        resetBoard,
    }
}
