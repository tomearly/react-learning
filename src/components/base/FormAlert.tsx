import { AlertCircleIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"
import {
    Item,
} from "@/components/ui/item"

type AddTaskFormDialogProps = {
    validationMessages: string[],
    variant?: "default" | "destructive"
}

function FormAlert({validationMessages, variant = "destructive"}: AddTaskFormDialogProps) {
    if (validationMessages.length > 0) {
        return (
            <>
                <Alert variant={variant} className="max-w-md">
                    <AlertCircleIcon />
                    <AlertDescription className="flex-col space-y-2">
                        {(validationMessages.map((m: string) => (
                            <Item key={m} variant="outline">{m}</Item>
                        )))}
                    </AlertDescription>
                </Alert>
            </>
        )
    }
}

export default FormAlert;