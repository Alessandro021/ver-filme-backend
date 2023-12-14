import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { IFimes } from "../../database/models/Filmes";
import {createFilmeProvider} from "../../providers/filmes/CreateFilmeProvider";
import { validacao } from "../../middleware/Validacao";

interface IFimesProps extends Omit<IFimes, "id">{}
  
  
const validarFilmesProps: yup.ObjectSchema<IFimesProps> = yup.object().shape({
    duracao: yup.number().default(0).nonNullable().optional(),
    categoria: yup.string().nonNullable().min(5).required(),
    titulo: yup.string().required().nonNullable().min(5),
    genero: yup.array().of(yup.string().min(5).required().nonNullable()).required(),
    descricao: yup.string().required(),
    popularidade: yup.number().default(0).nonNullable().optional(),
    poster: yup.string().required().nonNullable(),
    imagem_fundo: yup.string().required().nonNullable(),
    file: yup.string().nonNullable().required(),
    treiler: yup.string().notRequired().url().nullable(),
    voto_medio: yup.number().default(0).nonNullable().optional(),
    data: yup
        .string()
        .required("Data do episódio é obrigatória")
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value);
        })
});

export const validarReqCreateFilme = validacao("body" , validarFilmesProps);

export const criarFilme = async ( req: Request, res: Response) => {

    const result = await createFilmeProvider(req.body);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(201).json({error: false, result: result});

};