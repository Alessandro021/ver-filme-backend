import { NextFunction, Request, Response } from "express";
import * as yup from "yup"
import { IFimes } from "../database/models/Filmes";


export const validacao = (schemas: yup.ObjectSchema<Omit<IFimes,"id">>) => async ( req: Request, res: Response, next: NextFunction) => {
    await schemas.validate(req.body, {abortEarly: false})
    .then(() => next())
    .catch(err => res.status(422).json({errors: err.errors}))
}

