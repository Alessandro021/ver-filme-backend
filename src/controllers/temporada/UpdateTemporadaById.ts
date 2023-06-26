import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { ITemporadaReturn } from "../../database/models/Series";
import { Request, Response } from "express";
import { updateTemporadaByIdProvider } from "../../providers/temporada/UpdateTemporadaByIdProvider";

interface ITemporadaProps extends Omit<ITemporadaReturn, "id" | "episodios"> {}

interface IIdTemporada {
    id: string;
}

const validarIdTemporadaParms: yup.ObjectSchema<IIdTemporada> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

const validarIdTemporadaBody: yup.ObjectSchema<Partial<ITemporadaProps>> = yup.object().shape({
    titulo: yup.string().optional().nonNullable().min(5),
    num_episodios: yup.number().default(0).nonNullable().optional(),
});



export const validarReqUpdateTemporadaByIdParams = validacao("params", validarIdTemporadaParms);
export const validarReqUpdateTemporadaByIdBody = validacao("body", validarIdTemporadaBody);

export const updateTemporadaById = async (req: Request, res: Response) => {
    const result = await updateTemporadaByIdProvider(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};