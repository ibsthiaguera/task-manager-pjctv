import { Request, Response } from "express"
import { ListUserBySquadService } from "../../services/user/ListUserBySquadService"

class ListUserBySquadController {
    async handle(req: Request, res: Response) {

        const squad_id = Number(req.query.squad_id)
        const listUserBySquad = new ListUserBySquadService()

        const squads = await listUserBySquad.execute({
            squad_id
        })

        return res.json(squads)
    }
}

export { ListUserBySquadController }