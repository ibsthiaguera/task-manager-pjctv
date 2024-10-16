import prismaClient from '../../prisma'

interface SquadRequest {
    id: number
}

class DeleteSquadService {
    async execute({ id }: SquadRequest) {
        if (id === null || !id) throw new Error('ID invalid!')

        const squad = await prismaClient.squad.delete({
            where: {
                id: id,
            },
        })

        return squad
    }
}

export { DeleteSquadService }
