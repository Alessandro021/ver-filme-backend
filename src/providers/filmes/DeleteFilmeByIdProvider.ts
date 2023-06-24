import { prisma } from "../../database/prisma";

export const deleteFilmeByIdProvider = async (id: string): Promise<void | Error> => {

    try {
        
        const filme = await prisma.filme.delete({
            where: {
                id: id
            }
        });

        if(filme) {
            return;
        } else {
            return Error(`Erro ao deletera filme com ID: ${id}`);
        }
    } catch (error) {
        console.log(`ERRO AO DELELETAR FIME: ${error}`);
        return Error(`Erro ao deletera filme com ID: ${id}`);
    }
};