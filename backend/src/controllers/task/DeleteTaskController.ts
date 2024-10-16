import { Request, Response } from 'express'
import { DeleteTaskService } from '../../services/task/DeleteTaskService'

class DeleteTaskController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const deleteTaskService = new DeleteTaskService()

        const task = await deleteTaskService.execute({
            id,
        })

        return res.json(task)
    }
}

export { DeleteTaskController }
