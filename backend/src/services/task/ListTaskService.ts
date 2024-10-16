import prismaClient from "../../prisma"

class ListTaskService {
    async execute() {
        
        const task = await prismaClient.task.findMany({
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
                    }
                }
            },
            orderBy: {
                title: 'asc'
            }
        })

        return task
    }
}

export { ListTaskService }