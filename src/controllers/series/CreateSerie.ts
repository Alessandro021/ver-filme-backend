import { ISerie } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createSerieProvider } from "../../providers/series/CreateSerieProvider";

interface ISerieProps extends Omit<ISerie, "id">{}

const validarSeriesProps: yup.ObjectSchema<ISerieProps> = yup.object().shape({
    linguagem: yup.string().min(5).required().nonNullable(),
    titulo: yup.string().required().nonNullable().min(5),
    titulo_temporada: yup.string().required().nonNullable().min(5),
    num_episodios: yup.number().default(0).nonNullable(),
    genero: yup.string().min(5).required().nonNullable(),
    descricao: yup.string().required(),
    popularidade: yup.number().default(0).nonNullable(),
    poster: yup.string().required().url().nonNullable(),
    data: yup.string().required().nonNullable(),
    video: yup.string().url(),
    trailer: yup.string().optional().url(),
    voto_medio: yup.number().default(0).nonNullable(),
});

export const validarReqCreateSerie = validacao("body", validarSeriesProps);

export const createSerie = async (req: Request<{}, {}, ISerieProps>, res: Response) => {


    const {titulo_temporada,num_episodios, ...all} = req.body;
    
    const result = await createSerieProvider(titulo_temporada, num_episodios, all);


    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }


    return res.status(201).json(result);

};