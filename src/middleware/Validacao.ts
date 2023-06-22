import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

type TProperty = "body" | "headers" | "params" |"query";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = yup.ObjectSchema<any>;


export const validacao = (nome: TProperty, schema:TAllSchemas ) => async ( req: Request, res: Response, next: NextFunction) => {
    switch (nome) {
    case  "body":
        await schema.validate(req.body, {abortEarly: false})
            .then(() => next())
            .catch(err => res.status(422).json({errors: err.errors}));
        break;
    case  "headers":
        await schema.validate(req.headers, {abortEarly: false})
            .then(() => next())
            .catch(err => res.status(422).json({errors: err.errors})); 
        break;
    case  "params":
        await schema.validate(req.params, {abortEarly: false})
            .then(() => next())
            .catch(err => res.status(422).json({errors: err.errors})); 
        break;
    case  "query":
        await schema.validate(req.query, {abortEarly: false})
            .then(() => next())
            .catch(err => res.status(422).json({errors: err.errors})); 
        break;
    default:
        res.status(422).json({errors: "Erro ao validar dados enviados"});
    }
};

