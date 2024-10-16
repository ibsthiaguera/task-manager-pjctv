import { Request, Response } from 'express'
import { CreateAttachmentService } from '../../services/attachment/CreateAttachmentService'

class CreateAttachmentController {
    async handle(req: Request, res: Response) {
        const { description, task_id } = req.body

        if (!req.file)
            return res.status(400).json({ error: 'File not uploaded.' })

        const createAttachmentService = new CreateAttachmentService()

        try {

            const attachment = await createAttachmentService.execute({
                description: description,
                original_name: req.file.originalname,
                file_name: req.file.filename,
                task_id: Number(task_id),
            })

            return res.json(attachment)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export { CreateAttachmentController }
