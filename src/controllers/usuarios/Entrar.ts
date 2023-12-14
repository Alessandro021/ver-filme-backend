import { IUsuario } from "../../database/models/Usuarios";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { Request, Response} from "express";
import { entrarProvider } from "../../providers/usuarios/EntrarProvider";

interface IUsuarioProps extends Omit<IUsuario, "eAdmin" | "nome">{}

const validarUsuarioProps: yup.ObjectSchema<IUsuarioProps> = yup.object().shape({
    email: yup.string().email().required().nonNullable().min(6),
    senha: yup.string().required().nonNullable().min(6)
});

export const validarReqLogarUsuario = validacao("body", validarUsuarioProps);

export const entrar = async (req: Request, res: Response) => {
    const result = await entrarProvider(req.body);

    if(result instanceof Error){
        if(result.message === "UNAUTHORIZED"){
            return res.status(401).json({error: true, message: "email ou senha são invalidos"});
        }

        return res.status(500).json({error: true, message: result.message });
    }

    return res.status(200).json({error: false, result: result});
};