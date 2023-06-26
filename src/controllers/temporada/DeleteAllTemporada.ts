import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteAllTemporadasProvider } from "../../providers/temporada/DeleleAlltemporadaProvider";

interface IIdSerie {
    id: string;
}

const validarSerieIdParms: yup.ObjectSchema<IIdSerie> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqDeleteAllTemporada  = validacao("params", validarSerieIdParms);

export const deleteAllTemporadas = async (req: Request, res: Response) => {
    const result = await deleteAllTemporadasProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};