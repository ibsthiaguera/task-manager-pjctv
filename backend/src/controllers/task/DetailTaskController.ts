import { Request, Response } from 'express'
import { DetailTaskService } from '../../services/task/DetailTaskService'

class DetailTaskController {
    async handle(req: Request, res: Response) {
        const id = req.query.id
        const detailTaskService = new DetailTaskService()
        const task = await detailTaskService.execute(Number(id))
        return res.json(task)
    }
}

export { DetailTaskController }
