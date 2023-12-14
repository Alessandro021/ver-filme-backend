import { IUsuario } from "../../database/models/Usuarios";
import { prisma } from "../../database/prisma";
import { hashSenha } from "../../services/IncripitarSenha";

interface IUsuarioProps extends Omit<IUsuario, "senha">{}

export const createUsuarioProvider = async (usuario: IUsuario): Promise<IUsuarioProps | Error> => {
    try {
        const senhaHash = await hashSenha(usuario.senha);

        const existeEmail = await prisma.usuario.findUnique({
            where: {email: usuario.email}
        });

        if(existeEmail?.email){
            return Error("Erro ao cadastra usuario");
        }
        
        const result = await prisma.usuario.create({
            data: {...usuario, senha: senhaHash},
            select: {
                id: true,
                nome: true,
                email: true,
                eAdmin: true,
            },
        });

        if(result){
            return result;
        } else {
            return Error("Houve um erro ao registrar usuario");
        }
        
    } catch (error) {
        // console.log(`ERROR: ${error}`);
        return Error("Error ao criar usuario");
    } finally {
        await prisma.$disconnect();
    }
};