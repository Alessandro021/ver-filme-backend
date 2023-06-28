
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response} from "express";
import { deleteEpisodiosByIdProvider } from "../../providers/episodios/DeleteEpisodiosByIdProvider";
import moment from "moment";

interface IIdsEpisodio{
    episodiosId: string[];
}

const validarIdsEpisodioBody: yup.ObjectSchema<IIdsEpisodio> = yup.object().shape({
    episodiosId: yup.array(yup.string().required().nonNullable().min(24).max(24)).required(),  
});

export const validarReqDeleteEpisodiosById = validacao("body", validarIdsEpisodioBody);

export const deleteEpisodiosById = async (req: Request, res: Response) => {
    
    const result = await deleteEpisodiosByIdProvider(req.body.episodiosId);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};
