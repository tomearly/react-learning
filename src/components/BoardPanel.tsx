import type { BoardState } from '@/types/BoardState'
import type { AddTaskHandler } from '@/types/AddTaskHandler'
import type { DeleteTaskHandler } from '@/types/DeleteTaskHandler'
import ColumnPanel from './ColumnPanel'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';

type BoardPanelProps = {
    data: BoardState,
    resetBoard: () => void,
    addTask: AddTaskHandler,
    deleteTask: DeleteTaskHandler,
}

function BoardPanel({ data, addTask, resetBoard, deleteTask }: BoardPanelProps) {
    const columns = data.columns

    return (
        <Card className="mx-auto max-w-6xl h-full">
            <CardHeader className="flex justify-between">
                <CardTitle className="text-2xl">{data.title}</CardTitle>
                <Button onClick={resetBoard} variant="destructive">Reset Board</Button>
            </CardHeader>
            <CardContent>
                <ColumnPanel columns={columns} addTask={addTask} deleteTask={deleteTask} />
            </CardContent>
        </Card>
    )
}

export default BoardPanel;
