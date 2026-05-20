import type { Board } from '@/types/Board'
import ColumnPanel from './ColumnPanel'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type BoardPanelProps = {
  data: Board
}

function BoardPanel({data}: BoardPanelProps) {

    const columns = [...data.columns].sort((a,b) => a.position - b.position)

    return (
        <Card className="mx-auto max-w-6xl">
            <CardHeader>
                <CardTitle className="text-2xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ColumnPanel columns={columns} />
            </CardContent>
        </Card>
    )
}

export default BoardPanel;
