import { Request, Response } from "express"
import { ListAttachmentByTaskService } from "../../services/attachment/ListAttachmentByTaskService"

class ListAttachmentByTaskController {
    async handle(req: Request, res: Response) {

        const task_id = Number(req.query.task_id)
        const listAttachmentByTask = new ListAttachmentByTaskService()

        const attachments = await listAttachmentByTask.execute({
            task_id
        })

        return res.json(attachments)
    }
}

export { ListAttachmentByTaskController }