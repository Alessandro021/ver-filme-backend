import { prisma } from "../../database/prisma";

export const deleteTemporadaByIdProvider = async (id: string): Promise<void | Error> => {
    
    try {
        await prisma.episodio.deleteMany({
            where: {
                temporadaId: id
            }
        });
    
        const result = await prisma.temporada.deleteMany({
            where: {
                id: id
            }
        });

        if(result.count !== 0) {
            return;
        } else {
            return Error(`Erro, temporada com id ${id} não existe`);
        }

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao deletar Temporada");
    }
};