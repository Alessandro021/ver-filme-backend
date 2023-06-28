import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteAllEpisodiosByIdProvider } from "../../providers/episodios/DeleteAllEpisodiosByIdProvider";

interface IIdTemporada {
    id: string;
}

const validarIdTemporadaParms: yup.ObjectSchema<IIdTemporada> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqDeleteAllEpisodiosById = validacao("params", validarIdTemporadaParms);

export const deleteAllEpisodiosById = async (req: Request, res: Response) => {
    
    const result = await deleteAllEpisodiosByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};