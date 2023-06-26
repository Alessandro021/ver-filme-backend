import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { getTemporadaByIdProvider } from "../../providers/temporada/GetTemporadaByIdProvider";

interface IIdTemporada {
    id: string;
}

const validarIdTemporadaParms: yup.ObjectSchema<IIdTemporada> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqGetTemporadaById = validacao("params", validarIdTemporadaParms );

export const getTemporadaById = async (req: Request, res: Response) => {
    const response = await getTemporadaByIdProvider(req.params.id);

    if(response instanceof Error){
        return res.status(500).json({
            errors: {
                default: response.message
            }
        });
    }

    return res.status(200).json(response);
};