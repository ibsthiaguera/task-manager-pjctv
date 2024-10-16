import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest {
    name: string
    email: string
    password: string
    role: string
    squad_id: number
}

class CreateUserService {
    async execute({ name, email, password, role, squad_id }: UserRequest) {

        if (!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                role: role,
                squad_id: squad_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                squad_id: true
            }
        })

        return user
    }
}

export { CreateUserService }