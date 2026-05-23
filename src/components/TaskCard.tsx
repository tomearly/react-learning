import type { TaskState } from '@/types/TaskState';
import { Card, CardTitle, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import type { ColumnStatus } from '@/types/ColumnStatus';

type TaskCardProps = {
    task: TaskState,
    deleteTask: (id: string) => void,
    moveToColumn: (id: string, collumnStatus: ColumnStatus) => void
}

function TaskCard({task, deleteTask, moveToColumn}: TaskCardProps) {
    return (
        <Card className="p-4">
            <CardHeader className="p-0 flex justify-between">
                <CardTitle>{task.title}</CardTitle>
                <Button onClick={() => deleteTask(task.id)}>Delete Task</Button>
                <Button onClick={() => moveToColumn(task.id, 'in_progress')}>Move to In Progress</Button>
            </CardHeader>
            <CardContent className='p-0'>
                {task.text}
            </CardContent>
        </Card>
    )
}

export default TaskCard;