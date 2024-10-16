import { Request, Response } from 'express'
import { DetailAttachmentService } from '../../services/attachment/DetailAttachmentService'
import path from 'path'
import fs from 'fs'

class DetailAttachmentController {
    async handle(req: Request, res: Response) {
        const id = req.query.id
        const detailAttachmentService = new DetailAttachmentService()

        const attachment = await detailAttachmentService.execute(Number(id))

        if (!attachment) {
            return res.status(404).json({ error: 'Attachment not found' })
        }

        const filePath = path.join(__dirname, '../../../uploads', attachment.file_name)

        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath)
            return res.json({
                file: file.toString('base64'),
                fileName: attachment.original_name,
            })
        } else {
            return res.status(404).json({ error: 'File not found on server' })
        }
    }
}

export { DetailAttachmentController }
