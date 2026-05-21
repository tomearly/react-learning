import type { BoardState } from '@/types/BoardState'
import type { AddTaskHandler } from '@/types/AddTaskHandler'
import ColumnPanel from './ColumnPanel'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type BoardPanelProps = {
  data: BoardState,
  addTask: AddTaskHandler
}

function BoardPanel({data, addTask}: BoardPanelProps) {

    const columns = data.columns

    return (
        <Card className="mx-auto max-w-6xl h-full">
            <CardHeader>
                <CardTitle className="text-2xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ColumnPanel columns={columns} addTask={addTask} />
            </CardContent>
        </Card>
    )
}

export default BoardPanel;
