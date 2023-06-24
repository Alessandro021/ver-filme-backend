import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteFilmeByIdProvider } from "../../providers/filmes/DeleteFilmeByIdProvider";


interface IIdFilmeProps {
    id: string;
}

const validarFilmeParms: yup.ObjectSchema<IIdFilmeProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqDeleteFilmeById = validacao("params", validarFilmeParms);

export const deteteFilmeById = async (req: Request, res: Response)=> {
    
    const result = await deleteFilmeByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            error : {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};