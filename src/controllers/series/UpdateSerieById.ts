import { ISerie } from "../../database/models/Series";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response } from "express";
import { updateSerieByIdProvider } from "../../providers/series/UpdateSerieByIdProvider";

interface ISerieProps extends Omit<ISerie, "id" | "num_episodios" | "titulo_temporada">{
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
    data: yup.string().optional().nonNullable(),
    video: yup.string().url(),
    trailer: yup.string().optional().url(),
    voto_medio: yup.number().default(0).nonNullable().optional(),
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