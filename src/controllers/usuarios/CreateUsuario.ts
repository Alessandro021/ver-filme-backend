import * as yup from "yup";
import { IUsuario } from "../../database/models/Usuarios";
import { validacao } from "../../middleware/Validacao";
import { Request, Response} from "express";
import { createUsuarioProvider } from "../../providers/usuarios/CreateUsuarioProvider";

interface IUsuarioProps extends Omit<IUsuario,"eAdmin">{}

const validarUsuarioProps: yup.ObjectSchema<IUsuarioProps> = yup.object().shape({
    nome: yup.string().required().nonNullable().min(3),
    email: yup.string().email().required().nonNullable().min(6),
    senha: yup.string().required().nonNullable().min(6)
});

export const validarReqCreateUsuario = validacao("body", validarUsuarioProps);

export const createUsuario = async (req: Request, res: Response) => {
    const result = await createUsuarioProvider(req.body);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(201).json({error: false, result: result});
};