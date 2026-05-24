import { useState, useCallback, useEffect } from "react"
import type { BoardState } from "@/types/BoardState"
import type { AddTaskHandler } from "@/types/AddTaskHandler"
import type { DeleteTaskHandler } from "@/types/DeleteTaskHandler"
import type { EditTaskHandler } from "@/types/EditTaskHandler"
import type { MoveToHandler } from "@/types/MoveToHandler"
import { saveBoardData, loadBoardData, clearBoardData } from "@/lib/boardStorage"
import { addTaskToBoard, deleteTaskFromBoard, editTaskInBoard, moveTaskInBoard } from "@/lib/boardActions"
import sampleData from "@/data/kanban.json"

const initialBoardData = sampleData as BoardState

const boardStorageKey = "kanban-board"

export function useBoardState() {
    const [boardData, setBoardData] = useState<BoardState>(() =>
        loadBoardData(boardStorageKey, initialBoardData)
    )

    useEffect(() => {
        saveBoardData(boardStorageKey, boardData)
    }, [boardData])

    const resetBoard = useCallback(() => {
        clearBoardData(boardStorageKey)
        setBoardData(initialBoardData)
    }, [])

    const addTask = useCallback<AddTaskHandler>((columnId, taskTitle, taskText) => {
        setBoardData((boardData) =>
            addTaskToBoard(boardData, columnId, taskTitle, taskText)
        )
    }, [])

    const deleteTask = useCallback<DeleteTaskHandler>((columnId, taskId) => {
        setBoardData((boardData) => deleteTaskFromBoard(boardData, columnId, taskId)
        )
    }, [])

    const moveToColumn = useCallback<MoveToHandler>((taskId, columnStatus) => {
        setBoardData((boardData) => moveTaskInBoard(boardData, taskId, columnStatus)
        )
    }, [])

    const editTask = useCallback<EditTaskHandler>((columnId, taskId, taskTitle, taskText) => {
        setBoardData((boardData) => editTaskInBoard(boardData, columnId, taskId, taskTitle, taskText)
        )
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