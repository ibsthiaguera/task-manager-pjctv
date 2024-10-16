import { Request, Response } from "express"
import { ListTaskByUserService } from "../../services/task/ListTaskByUserService"

class ListTaskByUserController {
    async handle(req: Request, res: Response) {

        const user_id = Number(req.query.user_id)
        const listTaskByUser = new ListTaskByUserService()

        const tasks = await listTaskByUser.execute({
            user_id
        })

        return res.json(tasks)
    }
}

export { ListTaskByUserController }