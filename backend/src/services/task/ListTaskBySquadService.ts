import prismaClient from '../../prisma'

interface TaskRequest {
    squad_id: number
}

class ListTaskBySquadService {
    async execute({ squad_id }: TaskRequest) {
        const findBySquad = await prismaClient.task.findMany({
            where: {
                user: {
                    squad_id: squad_id,
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                limit_date: true,
                status: true,
                attachment: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            },
            orderBy: {
                title: 'asc',
            },
        })

        return findBySquad
    }
}

export { ListTaskBySquadService }
