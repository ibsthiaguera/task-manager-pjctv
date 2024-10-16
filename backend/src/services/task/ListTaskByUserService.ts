import prismaClient from "../../prisma"

interface TaskRequest {
    user_id: number
}

class ListTaskByUserService {
    async execute({ user_id }: TaskRequest) {

        const findByUser = await prismaClient.task.findMany({
            where: {
                user_id: user_id
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
                title: 'asc'
            }
        })

        return findByUser

    }
}

export { ListTaskByUserService }