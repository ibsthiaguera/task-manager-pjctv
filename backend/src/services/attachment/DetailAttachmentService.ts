import prismaAttachment from '../../prisma'

class DetailAttachmentService {
    async execute(id: number) {
        const attachment = await prismaAttachment.attachment.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                description: true,
                file_name: true,
                original_name: true,
                task: true
            },
        })

        return attachment
    }
}

export { DetailAttachmentService }
