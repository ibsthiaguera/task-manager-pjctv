import { Task } from "./task.types"

export type User = {
    id: number
    name: string
    email: string
    role: string
    task: Task[]
}