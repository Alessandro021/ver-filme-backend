import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { updateFilmeByIdProvider } from "../../providers/filmes/UpdateFilmeByIdProvider";


interface IFilmeProps {
    linguagem: string;
    titulo: string;
    descricao: string;
    popularidade: number;
    genero: Array<string | undefined>;
    poster: string;
    data: string;
    video: string;
    trailer: string;
    voto_medio: number;
 }

interface IIdFilmesProps {
    id: string;
}

const validarFilmeBody: yup.ObjectSchema<Partial<IFilmeProps>> = yup.object().shape({
    linguagem: yup.string().min(5).nonNullable().optional(),
    titulo: yup.string().nonNullable().min(5).optional(),
    genero: yup.array().of(yup.string().min(5).nonNullable()).nonNullable().optional(),
    descricao: yup.string().nonNullable().optional().optional(),
    popularidade: yup.number().default(0).nonNullable().optional(),
    poster: yup.string().url().nonNullable().optional(),
    data: yup.string().nonNullable().optional(),
    video: yup.string().url().nonNullable().optional(),
    trailer: yup.string().url().nonNullable().optional(),
    voto_medio: yup.number().default(0).nonNullable().optional(),
});

const validarFilmeParams: yup.ObjectSchema<IIdFilmesProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqUpdateFilmeByIdBody = validacao("body", validarFilmeBody);
export const validarReqUpdateFilmeByIdParams = validacao("params", validarFilmeParams);


export const updateFilmeById = async (req: Request, res: Response) => {


    if(Object.keys(req.body).length === 0){
        return res.status(422).json({ 
            error : {
                default: "O body nao pode estar vazio"
            }});
    }
    
    const result = await updateFilmeByIdProvider(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(500).json({
            error : {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};


