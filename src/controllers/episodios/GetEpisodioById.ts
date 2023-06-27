import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { getEpisodioByIdProvider } from "../../providers/episodios/GetEpisodioByIdProvider";

interface IIdEpisodio {
    id: string;
}

const validarIdepisodioParms: yup.ObjectSchema<IIdEpisodio> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqGetEpisodioById = validacao("params", validarIdepisodioParms );

export const getEpisodioById = async (req: Request, res: Response) => {
    const result = await getEpisodioByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};