import { Request, Response } from 'express'
import { UpdateTaskService } from '../../services/task/UpdateTaskService'

class UpdateTaskController {
    async handle(req: Request, res: Response) {
        const { id, title, description, limit_date, status, user_id } = req.body
        const updateTaskService = new UpdateTaskService()

        const task = await updateTaskService.execute({
            id,
            title,
            description,
            limit_date,
            status,
            user_id,
        })

        return res.json(task)
    }
}

export { UpdateTaskController }
