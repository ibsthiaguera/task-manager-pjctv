import prismaClient from "../../prisma"

interface UserRequest {
    squad_id: number
}

class ListUserBySquadService {
    async execute({ squad_id }: UserRequest) {

        const findBySquad = await prismaClient.user.findMany({
            where: {
                squad_id: squad_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                task: true
            },
            orderBy: {
                name: 'asc'
            }
        })

        return findBySquad

    }
}

export { ListUserBySquadService }