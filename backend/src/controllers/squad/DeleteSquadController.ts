import { Request, Response } from 'express'
import { DeleteSquadService } from '../../services/squad/DeleteSquadService'

class DeleteSquadController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const deleteSquadService = new DeleteSquadService()

        const squad = await deleteSquadService.execute({
            id,
        })

        return res.json(squad)
    }
}

export { DeleteSquadController }
