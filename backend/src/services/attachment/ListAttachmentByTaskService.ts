import prismaClient from "../../prisma"

interface AttachmentRequest {
    task_id: number
}

class ListAttachmentByTaskService {
    async execute({ task_id }: AttachmentRequest) {

        const findByTask = await prismaClient.attachment.findMany({
            where: {
                task_id: task_id
            },
            select: {
                id: true,
                description: true,
                original_name: true,
                file_name: true
            },
            orderBy: {
                original_name: 'asc'
            }
        })

        return findByTask

    }
}

export { ListAttachmentByTaskService }