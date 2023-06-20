import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { IFimes } from "../../database/models/Filmes";
import { validacao } from "../../middleware/Validacao";
import {createFilmeProvider} from "../../providers/filmes/CreateFilme";

type IFimesProps = Omit<IFimes, "id">
 

const validarFilmes: yup.ObjectSchema<IFimesProps> = yup.object().shape({
    linguagem: yup.string().min(5).notRequired().nonNullable(),
    titulo: yup.string().required().nonNullable().min(5),
    descricao: yup.string().required(),
    popularidade: yup.number().default(0).nonNullable(),
    type: yup.string().required().nonNullable(),
    poster: yup.string().required().url().nonNullable(),
    data: yup.string().required().nonNullable(),
    video: yup.string().url().nonNullable(),
    trailer: yup.string().notRequired().url().nonNullable(),
    voto_medio: yup.number().default(0).nonNullable(),
});

export const criarValidarFilme = validacao(validarFilmes);

export const criarFilme = async ( req: Request, res: Response) => {

    const result = await createFilmeProvider(req.body);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(201).json(result);

};