import * as JWT from "jsonwebtoken";

interface IPayload {
    uid: string;
}

export const loginJwt = (payload: IPayload): string => {
    if(!process.env.JWT_SECRET){
        return "JWT_SECRET_NOT_FOUND";
    }

    return JWT.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"} );
};

export const verificarToken = (token: string): IPayload | string => {
    if(!process.env.JWT_SECRET){
        return "JWT_SECRET_NOT_FOUND";
    }

    try {
        
        const decodificar = JWT.verify(token, process.env.JWT_SECRET);

        if(typeof decodificar === "string"){
            return "INVALID_TOKEN";
        }

        return decodificar.uid;

    } catch (error) {
        return "INVALID_TOKEN";
    }
};