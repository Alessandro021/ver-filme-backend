import { prisma } from "../../database/prisma";

export const deleteAllTemporadasProvider = async (id: string): Promise<void | Error> => {

    try {

        await prisma.episodio.deleteMany({
            where: {
                temporada: {
                    serieId: id
                }
            }
        });

        const result = await prisma.temporada.deleteMany({
            where: {
                serieId: id,
            }
        });

        if(result.count !== 0) {
            return;
        } else {
            return Error(`Erro, serie com id ${id} nao existe`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("ERRO AO DELETAR TEMPORDADA");
    }
};