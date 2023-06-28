import { IEpisodios } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { updateEpisodioByIdProvider } from "../../providers/episodios/UpdateEpisodioByIdProvider";

interface IIdEpisodio {
    id: string;
}

interface IEpisodioProps extends Omit<IEpisodios, "id">{}

const validarIdepisodioParms: yup.ObjectSchema<IIdEpisodio> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

const validarEpisodios: yup.ObjectSchema<Partial<IEpisodioProps>> = yup.object().shape({
    titulo: yup.string().optional().min(5),
    descricao: yup.string().optional(),
    poster: yup.string().optional().url(),
    voto_medio: yup.number().default(0).optional(),
    video: yup.string().optional().url(),
    data: yup
        .string()
        .required("Data do episódio é obrigatória")
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value);
        })
});

export const validarReqUpdateEpisodioByIdParams = validacao("params", validarIdepisodioParms);
export const validarReqUpdateEpisodioByIdBody = validacao("body", validarEpisodios);


export const updateEpisodioById = async (req: Request, res: Response) => {
    const result = await updateEpisodioByIdProvider(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();
};