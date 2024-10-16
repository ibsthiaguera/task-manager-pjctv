import prismaClient from '../../prisma'

interface AttachmentRequest {
    description: string
    original_name: string
    file_name: string
    task_id: number
}

class CreateAttachmentService {
    async execute({ description, original_name, file_name, task_id }: AttachmentRequest) {
        if (!description || description.trim() === '') throw new Error('Invalid attachment description.')
        if (!original_name || original_name.trim() === '') throw new Error('Invalid attachment original name.')
        if (!file_name || file_name.trim() === '') throw new Error('Invalid attachment file name.')
        if (!task_id) throw new Error('Invalid task ID.')

        const attachment = await prismaClient.attachment.create({
            data: {
                description: description,
                original_name: original_name,
                file_name: file_name,
                task_id: task_id
            },
        })

        return attachment
    }
}

export { CreateAttachmentService }
