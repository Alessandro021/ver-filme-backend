import * as yup  from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { getSerieByIdProvider } from "../../providers/series/GetSerieByIdProvider";

interface IIdSerie {
    id: string;
}

const validarSerieParms: yup.ObjectSchema<IIdSerie> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqGetSerieById = validacao("params", validarSerieParms );

export const getSerieById = async (req: Request, res: Response) => {
    
    const result = await getSerieByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};