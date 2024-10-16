import { Request, Response } from "express"
import { ListTaskBySquadService } from "../../services/task/ListTaskBySquadService"

class ListTaskBySquadController {
    async handle(req: Request, res: Response) {

        const squad_id = Number(req.query.squad_id)
        const listTaskBySquad = new ListTaskBySquadService()

        const tasks = await listTaskBySquad.execute({
            squad_id
        })

        return res.json(tasks)
    }
}

export { ListTaskBySquadController }