import { Request, Response } from "express";
import * as yup from "yup";
import { getAllFilmesProvider } from "../../providers/filmes/GetAllFilmeProvider";
import { validacao } from "../../middleware/Validacao";

interface IQueryProps {
    filtrar?: string;
    pagina?: number;
    limite?: number;
}

const validarFilmeParms: yup.ObjectSchema<IQueryProps> = yup.object().shape({
    filtrar: yup.string().optional().min(2),
    pagina: yup.number().optional().moreThan(0),
    limite: yup.number().optional().moreThan(0),
});

export const validarReqGetAll = validacao("query", validarFilmeParms);


export const getAllFilmes = async ( req: Request<{},{},{},IQueryProps>, res: Response)=> {
    
    const allFilmes = await getAllFilmesProvider(  Number(req.query.pagina || 1), Number(req.query.limite || 10), req.query.filtrar || "");

    if(allFilmes instanceof Error){
        return res.status(500).json({
            error : {
                default: allFilmes.message
            }
        });
    }

    return res.status(200).json(allFilmes);
};