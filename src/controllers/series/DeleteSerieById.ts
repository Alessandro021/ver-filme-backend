import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteSerieByIdProvider } from "../../providers/series/DeleteSerieByIdProvider";

interface IIdSerie {
    id: string;
}

const validarserieParms: yup.ObjectSchema<IIdSerie> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqDeleteSerieById = validacao("params", validarserieParms);

export const deleteSerieById = async (req: Request, res: Response) => {

    const result = await deleteSerieByIdProvider(req.params.id);

    if (result instanceof Error) {
        if(result instanceof Error){
            return res.status(500).json({
                error : {
                    default: result.message
                }
            });
        }
    }

    return res.status(204).send();

};