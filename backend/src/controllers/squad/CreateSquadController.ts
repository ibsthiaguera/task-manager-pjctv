import { Request, Response } from "express"
import { CreateSquadService } from "../../services/squad/CreateSquadService"

class CreateSquadController {
    async handle(req: Request, res: Response) {

        const { name } = req.body
        const createSquadService = new CreateSquadService()

        const squad = await createSquadService.execute({
            name
        })

        return res.json(squad)

    }
}

export { CreateSquadController }