import { IUsuario } from "../../database/models/Usuarios";
import { prisma } from "../../database/prisma";


interface IUsuarioProps extends Omit<IUsuario, "senha">{
    id: string;
}

export const getUsuarioByIdProvider = async (userId: string): Promise<IUsuarioProps | Error> => {
    try {

        const result = await prisma.usuario.findFirst({
            where: {id: userId},
            select: {
                id: true,
                nome: true,
                email: true,
                eAdmin: true
            }
        });

        if(result){
            return result;
        } else {
            return Error(`Ususario com id: ${userId}, não foi encontrado`);
        }
        
    } catch (error) {
        // console.log(`ERRRO: ${error}`);
        return Error("Erro ao buscar usuario");
    } finally {
        await prisma.$disconnect();
    }
}; 