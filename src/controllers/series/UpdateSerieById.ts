import { ISerie } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { updateSerieByIdProvider } from "../../providers/series/UpdateSerieByIdProvider";

interface ISerieProps extends Omit<ISerie, "id" | "num_episodios" | "titulo_temporada" | "episodios">{
}

interface IIdProps{
    id: string
}

const validarSerieBody: yup.ObjectSchema<Partial<ISerieProps> > = yup.object().shape({
    linguagem: yup.string().min(5).optional().nonNullable(),
    titulo: yup.string().optional().nonNullable().min(5),
    genero: yup.string().min(5).optional().nonNullable(),
    descricao: yup.string().optional(),
    popularidade: yup.number().default(0).nonNullable(),
    poster: yup.string().optional().url().nonNullable(),
    imagem_fundo: yup.string().optional().url().nonNullable(),
    trailer: yup.string().optional().url(),
    voto_medio: yup.number().default(0).nonNullable().optional(),
    data: yup
        .string()
        .optional()
        .test("data", "data formato de data incorreto, formato 'DD/MM/YYYY'", value => {
            const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/;
            return regex.test(value as any);
        })
});

const validarSerieIdParams: yup.ObjectSchema<IIdProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});


export const validarReqUpdateSerieByIdBody = validacao("body", validarSerieBody);
export const validarReqUpdateSerieByIdParams = validacao("params", validarSerieIdParams);

export const updateSerieById = async (req: Request, res: Response) => {

    if(Object.keys(req.body).length === 0){
        return res.status(422).json({ 
            error : {
                default: "O body nao pode estar vazio"
            }});
    }
    
    const result = await updateSerieByIdProvider(req.params.id, req.body);

    if(result instanceof Error){
        return res.status(500).json({
            error : {
                default: result.message
            }
        });
    }

    return res.status(204).send();

};