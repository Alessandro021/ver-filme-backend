import * as yup from "yup";
import { Request, Response } from "express";
import { getFilmeByIdProvider } from "../../providers/filmes/GetFilmeByIdProvider";
import { validacao } from "../../middleware/Validacao";

interface IIdFilmeProps {
    id: string;
}

const validarFilmeParms: yup.ObjectSchema<IIdFilmeProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqGetFilmeById = validacao("params", validarFilmeParms);

export const getFilmeById = async (req: Request, res: Response) => {

    const result = await getFilmeByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(200).json({error: false, result: result});

};