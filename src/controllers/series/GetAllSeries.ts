import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { getAllSerieProvider } from "../../providers/series/GetAllSerieProvider";

interface ISerieProps{
    filtrar?: string;
    pagina?: number;
    limite?: number;
}


const validarSerieParms: yup.ObjectSchema<ISerieProps> = yup.object().shape({
    filtrar: yup.string().optional().min(2),
    pagina: yup.number().optional().moreThan(0),
    limite: yup.number().optional().moreThan(0),
});

export const validarReqGetAllSerie = validacao("query", validarSerieParms);

export const getAllSerie = async (req: Request<{}, {}, {}, ISerieProps>, res: Response) => {
    
    const result = await getAllSerieProvider( Number(req.query.pagina || 1), Number(req.query.limite || 10), String(req.query.filtrar || ""));

    if(result instanceof Error){
        return res.status(500).json({
            error : {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};