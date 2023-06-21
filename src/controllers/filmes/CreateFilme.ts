import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { IFimes } from "../../database/models/Filmes";
import {createFilmeProvider} from "../../providers/filmes/CreateFilme";

interface IFimesProps extends Omit<IFimes, "id">{}
  
  
const validarFilmesProps: yup.ObjectSchema<IFimesProps> = yup.object().shape({
    linguagem: yup.string().min(5).notRequired().nonNullable(),
    titulo: yup.string().required().nonNullable().min(5),
    genero: yup.array().of(yup.string().required().nonNullable()).required(),
    descricao: yup.string().required(),
    popularidade: yup.number().default(0).nonNullable(),
    poster: yup.string().required().url().nonNullable(),
    data: yup.string().required().nonNullable(),
    video: yup.string().url().nonNullable(),
    trailer: yup.string().notRequired().url().nonNullable(),
    voto_medio: yup.number().default(0).nonNullable(),
});


const validacao = (schemas: yup.ObjectSchema<Omit<IFimes,"id">>) => async ( req: Request, res: Response, next: NextFunction) => {
    await schemas.validate(req.body, {abortEarly: false})
        .then(() => next())
        .catch(err => res.status(422).json({errors: err.errors}));
};

export const validarReqCreateFilme = validacao(validarFilmesProps);

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