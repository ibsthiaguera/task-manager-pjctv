import { Request, Response } from "express"
import { CreateTaskService } from "../../services/task/CreateTaskService"

class CreateTaskController {
    async handle(req: Request, res: Response) {

        const { title, description, limit_date, status, user_id } = req.body
        const createTaskService = new CreateTaskService()

        const task = await createTaskService.execute({
            title, description, limit_date, status, user_id
        })

        return res.json(task)

    }
}

export { CreateTaskController }