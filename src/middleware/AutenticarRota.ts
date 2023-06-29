import { NextFunction, Response, Request } from "express";
import { verificarToken } from "../services/ServicoJWT";

interface IPayload {
    uid: string;
}


export const autenticarRota = async (req: Request , res: Response, next: NextFunction  ) => {

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({
            errors: {
                default: "Usuario não autorizado!"
            }
        });
    }

    const [prefixo, tokenJwt]= authorization.split(" ");

    if(prefixo !== "Bearer"){
        return res.status(401).json({
            errors: {
                default: "Usuario não autorizado!"
            }
        });
    }

    const verificandoToken = verificarToken(tokenJwt);

    if(verificandoToken === "INVALID_TOKEN"){
        return res.status(500).json({
            errors: {
                default: "Usuario não autorizado!"
            }
        });
    } else if(verificandoToken === "JWT_SECRET_NOT_FOUND"){
        return res.status(500).json({
            errors: {
                default: "Erro ao tentar validar token!"
            }
        });
    }

    req.headers.userId = verificandoToken.toString();

    return next();
};