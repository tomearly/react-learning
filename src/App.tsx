import BoardPanel from "@/components/BoardPanel"
import { useBoardState } from "./hooks/useBoardState"

function App() {
  const {
    boardData,
    addTask,
    deleteTask,
    moveToColumn,
    editTask,
    resetBoard,
  } = useBoardState()

  return (
    <main>
      <BoardPanel
        data={boardData}
        addTask={addTask}
        deleteTask={deleteTask}
        moveToColumn={moveToColumn}
        editTask={editTask}
        resetBoard={resetBoard}
      />
    </main>
  )
}

export default App;