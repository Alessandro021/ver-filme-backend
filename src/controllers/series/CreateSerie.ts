import { IEpisodios, ISerie } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createSerieProvider } from "../../providers/series/CreateSerieProvider";

interface ISerieProps extends Omit<ISerie, "id">{}

interface IEpisodiosProps extends Omit<IEpisodios, "id">{}

const validarEpisodios: yup.ObjectSchema<Partial<IEpisodiosProps>> = yup.object().shape({
    titulo: yup.string().optional().min(5),
    data: yup.string().optional(),
    descricao: yup.string().optional(),
    poster: yup.string().optional().url(),
    voto_medio: yup.number().default(0).optional(),
    video: yup.string().optional().url(),
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
    data: yup.string().required().nonNullable(),
    trailer: yup.string().optional().url(),
    voto_medio: yup.number().default(0).nonNullable(),
    episodios: yup.array(validarEpisodios).default([]).nonNullable().optional()
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