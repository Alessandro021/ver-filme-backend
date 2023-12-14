import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { deleteFilmeByIdProvider } from "../../providers/filmes/DeleteFilmeByIdProvider";


interface IIdFilmeProps {
    id: string;
}

const validarFilmeParms: yup.ObjectSchema<IIdFilmeProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(25).max(25)
});

export const validarReqDeleteFilmeById = validacao("params", validarFilmeParms);

export const deteteFilmeById = async (req: Request, res: Response)=> {
    
    const result = await deleteFilmeByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(200).send({error: false, result: result});
};