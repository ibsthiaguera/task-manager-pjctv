import prismaClient from '../../prisma'

class DetailLoggedUserService {
    async execute() {
        const user = await prismaClient.user.findFirst({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                squad: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                task: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        limit_date: true,
                        status: true,
                    },
                },
            },
        })

        return user
    }
}

export { DetailLoggedUserService }
