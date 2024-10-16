import { Squad } from './squad.types'
import { User } from './user.types'

export type Task = {
    id: number
    title: string
    description: string
    limit_date: Date
    status: string

    squad?: Squad
    user?: User
}
