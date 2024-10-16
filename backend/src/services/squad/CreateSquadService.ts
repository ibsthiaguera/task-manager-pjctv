import prismaClient from '../../prisma'

interface SquadRequest {
    name: string
}

class CreateSquadService {
    async execute({ name }: SquadRequest) {
        if (!name || name.trim() === '') throw new Error('Invalid squad name.')

        const squad = await prismaClient.squad.create({
            data: {
                name: name,
            },
        })

        return squad
    }
}

export { CreateSquadService }
