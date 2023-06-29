
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response} from "express";
import { deleteEpisodiosByIdsProvider } from "../../providers/episodios/DeleteEpisodiosByIdsProvider";

interface IIdsEpisodio{
    episodiosId: string[];
}

const validarIdsEpisodioBody: yup.ObjectSchema<IIdsEpisodio> = yup.object().shape({
    episodiosId: yup.array(yup.string().required().nonNullable().min(24).max(24)).required(),  
});

export const validarReqDeleteEpisodiosByIds = validacao("body", validarIdsEpisodioBody);

export const deleteEpisodiosByIds = async (req: Request, res: Response) => {
    
    const result = await deleteEpisodiosByIdsProvider(req.body.episodiosId);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};
