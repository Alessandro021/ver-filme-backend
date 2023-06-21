import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { getFilmeByIdProvider } from "../../providers/filmes/GetFilmeByIdProvider";

interface IIdFilmeProps {
    id: string;
}

const validarFilmeParms: yup.ObjectSchema<IIdFilmeProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24)
});

// console.log(validarFilmeParms);


const validacao = (schemas: yup.ObjectSchema<IIdFilmeProps>) => async ( req: Request, res: Response, next: NextFunction) => {
    await schemas.validate(req.params, {abortEarly: false})
        .then(() => next())
        .catch(err => res.status(422).json({errors: err.errors}));
};


export const validarReqGetFilmeById = validacao(validarFilmeParms);

export const getFilmeById = async (req: Request, res: Response) => {

    // if(typeof req.params !== "string"){
    //     return res.status(422).json({Error: {}});
    // }

    const result = await getFilmeByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);

};