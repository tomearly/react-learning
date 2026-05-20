import type { Task } from '@/types/Task';
import { Card, CardTitle, CardContent, CardHeader } from './ui/card';

type TaskCardProps = {
    task: Task
}

function TaskCard({task}: TaskCardProps) {
    return (
        <Card className="p-4">
            <CardHeader className="p-0">
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
                {task.text}
            </CardContent>
        </Card>
    )
}

export default TaskCard;