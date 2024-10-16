import prismaTask from '../../prisma'

class DetailTaskService {
    async execute(id: number) {
        const task = await prismaTask.task.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                limit_date: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        squad: true
                    },
                },
            },
        })

        return task
    }
}

export { DetailTaskService }
