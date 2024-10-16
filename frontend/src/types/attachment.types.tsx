import { Task } from './task.types'

export type Attachment = {
    id?: number
    description: string
    original_name: string
    file_name: string
    task: Task[]
}
