import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest {
    email: string
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("User/Password incorrect!")
        }

        // gerar um token JWT e devolver dados do usuario, como id, name e email
        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                
            },
            process.env.JWT_SECRET,
            {
                subject: `${user.id}`,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
    }
}

export { AuthUserService }