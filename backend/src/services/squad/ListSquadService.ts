import prismaClient from "../../prisma"

class ListSquadService {
    async execute() {
        
        const squad = await prismaClient.squad.findMany({
            select: {
                id: true,
                name: true,
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
                name: 'asc'
            }
        })

        return squad
    }
}

export { ListSquadService }