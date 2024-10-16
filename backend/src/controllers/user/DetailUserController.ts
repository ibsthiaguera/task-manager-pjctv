import { Request, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
    async handle(req: Request, res: Response) {
        const id = req.query.id
        const detailUserService = new DetailUserService()
        const user = await detailUserService.execute(Number(id))
        return res.json(user)
    }
}

export { DetailUserController }
