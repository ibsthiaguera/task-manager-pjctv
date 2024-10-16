import prismaTask from '../../prisma'

interface TaskRequest {
    id: number
    title: string
    description: string
    limit_date: string
    status: string
    user_id: number
}

class UpdateTaskService {
    async execute({ id, title, description, limit_date, status, user_id }: TaskRequest) {
        if (!id) throw new Error('Invalid task id.')
        if (!title || title.trim() === '') throw new Error('Invalid task name.')
        if (!limit_date || title.trim() === '') throw new Error('Invalid task limit date.')
        if (!status || status.trim() === '') throw new Error('Invalid task status.')

        const parsedLimitDate = new Date(limit_date)

        const task = await prismaTask.task.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                limit_date: parsedLimitDate,
                status: status,
                user_id: user_id,
            },
        })

        return task
    }
}

export { UpdateTaskService }
