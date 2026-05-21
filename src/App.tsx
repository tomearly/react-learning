import { useState } from "react"
import data from "@/data/kanban.json"
import BoardPanel from "@/components/BoardPanel"
import type { BoardState } from "@/types/BoardState"
import type { AddTaskHandler } from "@/types/AddTaskHandler"

function App() {
  const board = data as BoardState
  
  const [boardData, setBoardData] = useState(board)

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

  return (
    <main className="min-h-svh bg-muted/30 p-6 text-foreground h-full">
      <BoardPanel data={boardData} addTask={addTask} />
    </main>
  )
}

export default App
