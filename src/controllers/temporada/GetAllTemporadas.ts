import { Request, Response } from "express";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { getAllTemporadasProvider } from "../../providers/temporada/GetAllTemporadasProvider";

interface IIdSerie {
    id: string;
}


const validarSerieIdParms: yup.ObjectSchema<IIdSerie> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqGetAllTemporadaSerieById = validacao("params", validarSerieIdParms );


export const getAllTemporadas = async (req: Request, res: Response) => {
    const temporadas = await getAllTemporadasProvider(req.params.id);

    if(temporadas instanceof Error){
        return res.status(500).json({
            errors: {
                default: temporadas.message
            }
        });
    }

    return res.status(200).json(temporadas);
};