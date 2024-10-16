import prismaUser from '../../prisma'

class DetailUserService {
    async execute(id: number) {
        const user = await prismaUser.user.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                squad: true,
                task: true
            },
        })

        return user
    }
}

export { DetailUserService }
