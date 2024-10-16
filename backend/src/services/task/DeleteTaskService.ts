import prismaClient from '../../prisma'

interface TaskRequest {
    id: number
}

class DeleteTaskService {
    async execute({ id }: TaskRequest) {
        if (id === null || !id) throw new Error('ID invalid!')

        const task = await prismaClient.task.delete({
            where: {
                id: id,
            },
        })

        return task
    }
}

export { DeleteTaskService }
