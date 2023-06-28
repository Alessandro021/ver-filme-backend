import { IEpisodios, ISerie } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createSerieProvider } from "../../providers/series/CreateSerieProvider";

interface ISerieProps extends Omit<ISerie, "id">{}

interface IEpisodiosProps extends Omit<IEpisodios, "id">{}

const validarEpisodios: yup.ObjectSchema<Partial<IEpisodiosProps>> = yup.object().shape({
    titulo: yup.string().optional().min(5),
    descricao: yup.string().optional(),
    poster: yup.string().optional().url(),
    voto_medio: yup.number().default(0).optional(),
    video: yup.string().optional().url(),
    data: yup
        .string()
        .optional()
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value as any);
        })
});

const validarSeriesProps: yup.ObjectSchema<ISerieProps> = yup.object().shape({
    linguagem: yup.string().min(5).required().nonNullable(),
    titulo: yup.string().required().nonNullable().min(5),
    titulo_temporada: yup.string().required().nonNullable().min(5),
    num_episodios: yup.number().default(0).nonNullable(),
    genero: yup.string().min(5).required().nonNullable(),
    descricao: yup.string().required(),
    popularidade: yup.number().default(0).nonNullable(),
    poster: yup.string().required().url().nonNullable(),
    imagem_fundo: yup.string().optional().url().nonNullable(),
    trailer: yup.string().optional().url(),
    voto_medio: yup.number().default(0).nonNullable(),
    episodios: yup.array(validarEpisodios).default([]).nonNullable().optional(),
    data: yup
        .string()
        .required("Data do episódio é obrigatória")
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value);
        })
});

export const validarReqCreateSerie = validacao("body", validarSeriesProps);

export const createSerie = async (req: Request<{}, {}, ISerieProps>, res: Response) => {


    const {titulo_temporada, num_episodios, episodios, ...all } = req.body;
    
    const result = await createSerieProvider(titulo_temporada, num_episodios, all, episodios);


    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }


    return res.status(201).json(result);

};