import { Request, Response } from 'express'
import { DeleteAttachmentService } from '../../services/attachment/DeleteAttachmentService'

class DeleteAttachmentController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const deleteAttachmentService = new DeleteAttachmentService()

        try {
            const attachment = await deleteAttachmentService.execute({
                id,
            })
            return res.json(attachment)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export { DeleteAttachmentController }
