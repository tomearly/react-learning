import { useState, useEffect } from "react"
import sampleData from "@/data/kanban.json"
import BoardPanel from "@/components/BoardPanel"
import type { BoardState } from "@/types/BoardState"
import type { AddTaskHandler } from "@/types/AddTaskHandler"
import type { DeleteTaskHandler } from "./types/DeleteTaskHandler"
import type { MoveToHandler } from "./types/MoveToHandler"
import type { EditTaskHandler } from "./types/EditTaskHandler"
import { saveBoardData, loadBoardData, clearBoardData } from "@/lib/boardStorage"
import { addTaskToBoard, deleteTaskFromBoard, editTaskInBoard, moveTaskInBoard } from "./lib/utils"

const initialBoardData = sampleData as BoardState

const boardStorageKey = "kanban-board"

function App() {
  const [boardData, setBoardData] = useState<BoardState>(() =>
    loadBoardData(boardStorageKey, initialBoardData)
  )

  useEffect(() => {
    saveBoardData(boardStorageKey, boardData)
  }, [boardData])

  const resetBoard = () => {
    clearBoardData(boardStorageKey)
    setBoardData(initialBoardData)
  }

  const addTask: AddTaskHandler = (columnId, taskTitle, taskText) => {
    setBoardData((boardData) => addTaskToBoard(boardData, columnId, taskTitle, taskText))
  }

  const deleteTask: DeleteTaskHandler = (columnId, taskId) => {
    setBoardData((boardData) => deleteTaskFromBoard(boardData, columnId, taskId))
  }

  const moveToColumn: MoveToHandler = (taskId, columnStatus) => {
    setBoardData((boardData) => moveTaskInBoard(boardData, taskId, columnStatus))
  }

  const editTask: EditTaskHandler = (columnId, taskId, taskTitle, taskText) => {
    setBoardData((boardData) => editTaskInBoard(boardData, columnId, taskId, taskTitle, taskText))
  }

  return (
    <main className="min-h-svh bg-muted/30 p-6 text-foreground h-full">
      <BoardPanel data={boardData} addTask={addTask} deleteTask={deleteTask} moveToColumn={moveToColumn} resetBoard={resetBoard} editTask={editTask}/>
    </main>
  )
}

export default App
