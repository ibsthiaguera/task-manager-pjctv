import prismaUser from '../../prisma'

interface UserRequest {
    id: number
    name: string
    email: string
    role: string
    squad_id: number
}

class UpdateUserService {
    async execute({ id, name, email, role, squad_id }: UserRequest) {
        if (!id) throw new Error('Invalid user id.')
        if (!name || name.trim() === '') throw new Error('Invalid user name.')
        if (!email || email.trim() === '') throw new Error('Invalid user email.')
        if (!role || role.trim() === '') throw new Error('Invalid user role.')

        const user = await prismaUser.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                role: role,
                squad_id: squad_id,
            },
        })

        return user
    }
}

export { UpdateUserService }
