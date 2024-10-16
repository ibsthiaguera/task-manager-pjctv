import { Request, Response } from "express"
import { ListSquadService } from "../../services/squad/ListSquadService"

class ListSquadController {
    async handle(req: Request, res: Response) {

        const listSquadService = new ListSquadService()
        const squad = await listSquadService.execute()

        return res.json(squad)

    }
}

export { ListSquadController }