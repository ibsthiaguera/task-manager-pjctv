import prismaClient from '../../prisma'

interface UserRequest {
    id: number
}

class DeleteUserService {
    async execute({ id }: UserRequest) {
        if (id === null || !id) throw new Error('ID invalid!')

        const user = await prismaClient.user.delete({
            where: {
                id: id,
            },
        })

        return user
    }
}

export { DeleteUserService }
