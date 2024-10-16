import prismaClient from '../../prisma'

interface TaskRequest {
    title: string
    description: string
    limit_date: string
    status: string
    user_id: number
}

class CreateTaskService {
    async execute({ title, description, limit_date, status, user_id }: TaskRequest) {
        if (!title || title.trim() === '') throw new Error('Invalid task name.')
        if (!limit_date || title.trim() === '') throw new Error('Invalid task limit date.')
        if (!status || status.trim() === '') throw new Error('Invalid task status.')

        const parsedLimitDate = new Date(limit_date);

        const task = await prismaClient.task.create({
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

export { CreateTaskService }
