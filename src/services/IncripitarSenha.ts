import { hash, genSalt} from "bcryptjs";

const SALT = 12;

export const hashSenha = async (senha: string): Promise<string> =>{
    const saltoGerado = await genSalt(SALT);
    const hashGerado = await hash(senha, saltoGerado);
    return hashGerado;
};