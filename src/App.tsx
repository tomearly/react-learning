import { useState, useEffect } from "react"
import sampleData from "@/data/kanban.json"
import BoardPanel from "@/components/BoardPanel"
import type { BoardState } from "@/types/BoardState"
import type { AddTaskHandler } from "@/types/AddTaskHandler"
import type { DeleteTaskHandler } from "./types/DeleteTaskHandler"
import type { MoveToHandler } from "./types/MoveToHandler"
import { saveBoardData, loadBoardData, clearBoardData } from "@/lib/boardStorage"

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
    setBoardData((currentBoardData) => ({
      ...currentBoardData,
      columns: currentBoardData.columns.map((column) => {
        if (column.id !== columnId) {
          return column
        }

        return {
          ...column,
          tasks: [
            ...column.tasks,
            {
              id: crypto.randomUUID(),
              position: column.tasks.length,
              title: taskTitle,
              text: taskText,
            },
          ],
        }
      }),
    }))
  }

  const deleteTask: DeleteTaskHandler = (columnId, taskId) => {
    setBoardData((currentBoardData) => ({
      ...currentBoardData,
      columns: currentBoardData.columns.map((column) => {
        if (column.id !== columnId) {
          return column
        }

        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        }
      })
    }))
  }

  const moveToColumn: MoveToHandler = (taskId, columnStatus) => {
    console.log(taskId)
    setBoardData((currentBoardData) => {
      const taskToMove = currentBoardData.columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId)

      if (!taskToMove) {
        throw new Error(`Cannot move task because task "${taskId}" was not found.`)
      }

      const targetColumn = currentBoardData.columns.find((column) => column.status === columnStatus)

      if (!targetColumn) {
        throw new Error(`Cannot move task because column "${columnStatus}" was not found.`)
      }

      return {
        ...currentBoardData,
        columns: currentBoardData.columns.map((column) => {
          if (column.id === targetColumn.id) {
            return {
              ...column,
              tasks: [
                ...column.tasks.filter((task) => task.id !== taskId),
                {
                  ...taskToMove,
                  position: column.tasks.length,
                },
              ],
            }
          }

          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          }
        }),
      }
    })
  }

  return (
    <main className="min-h-svh bg-muted/30 p-6 text-foreground h-full">
      <BoardPanel data={boardData} addTask={addTask} deleteTask={deleteTask} moveToColumn={moveToColumn} resetBoard={resetBoard} />
    </main>
  )
}

export default App
