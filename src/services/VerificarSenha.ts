import {compare} from "bcryptjs";

export const descriptografarSenha = async (senha: string, senhaHash: string): Promise<boolean> => {
    return await compare(senha, senhaHash);
};