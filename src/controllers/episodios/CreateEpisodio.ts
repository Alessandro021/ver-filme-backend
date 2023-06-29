import { IEpisodios, ITemporada } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { createEpisodioProvider } from "../../providers/episodios/CreateEpisodioProvider";


interface IEpisodioProps extends Omit<ITemporada, "id" | "titulo_temporada" | "num_episodios">{
    temporadaId: string;
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
    temporadaId: yup.string().required().nonNullable().min(24).max(24),
    episodios: yup.array(validarEpisodioProps).default([]).nonNullable().optional()
});

export const validarReqCreateEpisodioBody = validacao("body", validarEpisodiosBody);

export const cerateEpisodio = async (req: Request<{}, {}, IEpisodioProps>, res: Response) => {

    const {temporadaId, episodios} = req.body;
    
    const result = await createEpisodioProvider(temporadaId, episodios);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(201).json(result);
};