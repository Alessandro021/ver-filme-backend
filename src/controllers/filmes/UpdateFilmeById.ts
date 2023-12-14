import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { updateFilmeByIdProvider } from "../../providers/filmes/UpdateFilmeByIdProvider";
import { IFimes } from "../../database/models/Filmes";

interface IFilmeProps extends Omit<IFimes, "id">{}

interface IIdFilmesProps {
    id: string;
}

const validarFilmeBody: yup.ObjectSchema<Partial<IFilmeProps>> = yup.object().shape({
    categoria: yup.string().nonNullable().min(5).optional(),
    titulo: yup.string().nonNullable().min(5).optional(),
    genero: yup.array().of(yup.string().min(5).nonNullable().required()).nonNullable().optional(),
    descricao: yup.string().nonNullable().optional(),
    popularidade: yup.number().default(0).nonNullable().optional(),
    poster: yup.string().nonNullable().optional(),
    imagem_fundo: yup.string().optional().nonNullable(),
    file: yup.string().nonNullable().optional(),
    treiler: yup.string().url().nullable().optional(),
    voto_medio: yup.number().default(0).nonNullable().optional(),
    duracao: yup.number().default(0).nonNullable().optional(),
    data: yup
        .string()
        .optional()
        .test("data", "formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            if (value === undefined) return true;
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value);
        })
});

const validarFilmeParams: yup.ObjectSchema<IIdFilmesProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(25).max(25)
});

export const validarReqUpdateFilmeByIdBody = validacao("body", validarFilmeBody);
export const validarReqUpdateFilmeByIdParams = validacao("params", validarFilmeParams);


export const updateFilmeById = async (req: Request, res: Response) => {


    if(Object.keys(req.body).length === 0){
        return res.status(422).json({error: true, message: "O body nao pode estar vazio"});
    }
    
    const result = await updateFilmeByIdProvider(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(200).json({error: false, result: result});
};


