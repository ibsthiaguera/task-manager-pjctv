import { Request, Response } from 'express'
import { DetailLoggedUserService } from '../../services/user/DetailLoggedUserService'

class DetailLoggedUserController {
    async handle(req: Request, res: Response) {
        const detailLoggedUserService = new DetailLoggedUserService()
        const user = await detailLoggedUserService.execute()
        return res.json(user)
    }
}

export { DetailLoggedUserController }
