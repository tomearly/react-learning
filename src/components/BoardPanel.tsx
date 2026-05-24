import type { BoardState } from '@/types/BoardState'
import type { AddTaskHandler } from '@/types/AddTaskHandler'
import type { DeleteTaskHandler } from '@/types/DeleteTaskHandler'
import ColumnPanel from './ColumnPanel'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import type { MoveToHandler } from '@/types/MoveToHandler'
import type { EditTaskHandler } from '@/types/EditTaskHandler'

type BoardPanelProps = {
    data: BoardState,
    resetBoard: () => void,
    addTask: AddTaskHandler,
    deleteTask: DeleteTaskHandler,
    moveToColumn: MoveToHandler,
    editTask: EditTaskHandler
}

function BoardPanel({ data, addTask, resetBoard, deleteTask, moveToColumn, editTask }: BoardPanelProps) {
    const columns = data.columns.sort((a,b) => a.position - b.position);

    return (
        <Card className="mx-auto max-w-6xl h-full">
            <CardHeader className="flex justify-between">
                <CardTitle className="text-2xl">{data.title}</CardTitle>
                <Button onClick={resetBoard} variant="destructive">Reset Board</Button>
            </CardHeader>
            <CardContent>
                <ColumnPanel columns={columns} addTask={addTask} deleteTask={deleteTask} moveToColumn={moveToColumn} editTask={editTask}/>
            </CardContent>
        </Card>
    )
}

export default BoardPanel;
