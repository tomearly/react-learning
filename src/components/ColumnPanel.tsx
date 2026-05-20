import type { Column } from '@/types/Column'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import TaskCard from '@/components/TaskCard'

type ColumnPanelProps = {
    columns: Column[]
}

function ColumnPanel({ columns }: ColumnPanelProps) {
    return (
        <section className="grid gap-4 md:grid-cols-3">
            {columns.map((column) => (
                <Card key={column.id} className="bg-background">
                    <CardHeader>
                        <CardTitle>{column.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {column.tasks.map((task) => (
                            <TaskCard task={task} />
                        ))}
                    </CardContent>
                </Card>
            ))}
        </section>
    )
};

export default ColumnPanel;
