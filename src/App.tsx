import { useState } from "react"
import data from "@/data/kanban.json"
import BoardPanel from "@/components/BoardPanel"
import type { Board } from "@/types/Board"

function App() {
  const board = data as Board
  
  const [boardData, setBoardData] = useState(board)

  return (
    <main className="min-h-svh bg-muted/30 p-6 text-foreground">
      <BoardPanel data={boardData}/>
    </main>
  )
}

export default App
