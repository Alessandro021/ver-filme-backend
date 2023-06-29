import { Request, Response } from "express";
import * as yup from "yup";
import { validacao } from "../../middleware/Validacao";
import { getUsuarioByIdProvider } from "../../providers/usuarios/GetUsuarioByIdProvider";

interface IIdUsuarioProps {
    id: string;
}

const validarUsuarioProps: yup.ObjectSchema<IIdUsuarioProps> = yup.object().shape({
    id: yup.string().required().nonNullable().min(24).max(24),
});


export const validarReqGetUsuarioById = validacao("params", validarUsuarioProps);


export const getUsuarioById = async (req: Request, res: Response) => {
    const result = await getUsuarioByIdProvider(req.params.id);

    if(result instanceof Error){
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(200).json(result);
};