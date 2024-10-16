import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, role, squad_id } = req.body
        const createUserService = new CreateUserService()
        const user = await createUserService.execute({
            name,
            email,
            password,
            role,
            squad_id,
        })

        return res.json(user)
    }
}

export { CreateUserController }
