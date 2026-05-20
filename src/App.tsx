import data from "@/data/kanban.json"
import BoardPanel from "@/components/BoardPanel"
import type { Board } from "@/types/Board"

function App() {
  const board = data as Board
  
  return (
    <main className="min-h-svh bg-muted/30 p-6 text-foreground">
      <BoardPanel data={board}/>
    </main>
  )
}

export default App
