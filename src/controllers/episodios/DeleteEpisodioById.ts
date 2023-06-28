import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteEpisodioByIdProvider } from "../../providers/episodios/DeleteEpisodioByIdProvider";

interface IIdEpisodio {
    id: string;
}

const validarIdEpisodioParms: yup.ObjectSchema<IIdEpisodio> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqDeleteEpisodioById = validacao("params", validarIdEpisodioParms);

export const deleteEpisodioById = async (req: Request, res: Response) => {
    const result = await deleteEpisodioByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};