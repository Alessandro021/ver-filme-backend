import { IEpisodios, ITemporada } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createEpisodioProvider } from "../../providers/episodios/CreateEpisodioProvider";


interface IEpisodioProps extends Omit<ITemporada, "id" | "titulo_temporada" | "num_episodios">{}

interface IIdTemporadaProps {
    id: string;
}

const validarEpisodioProps: yup.ObjectSchema<Omit<IEpisodios, "id">> = yup.object().shape({
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

const validarEpisodiosBody: yup.ObjectSchema<IEpisodioProps> =  yup.object().shape({
    episodios: yup.array(validarEpisodioProps).default([]).nonNullable().optional()
});

const validarIdTemporadaParams: yup.ObjectSchema<IIdTemporadaProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

export const validarReqCreateEpisodiobody = validacao("body", validarEpisodiosBody);

export const validarReqCreateEpisodioparams = validacao("params", validarIdTemporadaParams);

export const cerateEpisodio = async (req: Request, res: Response) => {
    
    const result = await createEpisodioProvider(req.params.id, req.body.episodios);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(201).json(result);
};