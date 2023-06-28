import * as yup from "yup";
import {IEpisodios, ITemporadaReturn } from "../../database/models/Series";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createTemporadaProvider } from "../../providers/temporada/CreateTemporadaProvider";


interface ITemporadaProps extends Omit<ITemporadaReturn, "id">{
    serieId: string;
}

interface IEpisodiosProps extends Omit<IEpisodios, "id">{}

const validarEpisodios: yup.ObjectSchema<Partial<IEpisodiosProps>> = yup.object().shape({
    titulo: yup.string().required().min(5),
    descricao: yup.string().optional(),
    poster: yup.string().required().url(),
    voto_medio: yup.number().default(0).optional(),
    video: yup.string().required().url(),
    data: yup
        .string()
        .required("Data do episódio é obrigatória")
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value);
        })
});

const validarTemporadaProps: yup.ObjectSchema<ITemporadaProps> =  yup.object().shape({
    titulo: yup.string().required().nonNullable().min(5),
    num_episodios: yup.number().default(0).nonNullable().required(),
    serieId: yup.string().required().nonNullable().min(24).max(24),
    episodios: yup.array(validarEpisodios).default([]).nonNullable().optional()
});

export const validarReqCreateTemporada = validacao("body", validarTemporadaProps);


export const createTemporada = async (req: Request<{}, {}, ITemporadaProps>, res: Response) => {

    const {episodios, ...all} = req.body;
    
    const result = await createTemporadaProvider(all, episodios );

    
    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(201).json(result);
};