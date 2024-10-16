import prismaClient from '../../prisma'
import fs from 'fs'
import path from 'path'

interface AttachmentRequest {
    id: number
}

class DeleteAttachmentService {
    async execute({ id }: AttachmentRequest) {
        if (id === null || !id) throw new Error('ID invalid!')

        const attachment = await prismaClient.attachment.findUnique({
            where: { id: id },
        })

        if (!attachment) {
            throw new Error('Attachment not found!')
        }

        await prismaClient.attachment.delete({
            where: { id: id },
        })

        const filePath = path.join(__dirname, '../../../uploads', attachment.file_name) // Corrigido aqui
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erro ao deletar o arquivo:', err)
            } else {
                console.log(`Arquivo ${attachment.file_name} deletado com sucesso.`)
            }
        })

        return attachment // ou algum outro dado que você deseja retornar
    }
}

export { DeleteAttachmentService }
