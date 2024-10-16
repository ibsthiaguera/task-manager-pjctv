import { Request, Response } from 'express'
import { UpdateUserService } from '../../services/user/UpdateUserService'

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { id, name, email, role, squad_id } = req.body
        const updateUserService = new UpdateUserService()

        const user = await updateUserService.execute({
            id,
            name,
            email,
            role,
            squad_id,
        })

        return res.json(user)
    }
}

export { UpdateUserController }
