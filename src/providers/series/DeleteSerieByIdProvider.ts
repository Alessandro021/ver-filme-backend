import { prisma } from "../../database/prisma";

export const deleteSerieByIdProvider = async (id: string): Promise<void | Error> => {

    try {

        const result = await prisma.serie.findUnique({
            where: { id: id },
        });

        if(!result){
            return Error(`Erro serie com id: ${id} não foi encontrado`);
        }

        await prisma.episodio.deleteMany({
            where: {
                temporada: {
                    serieId: result.id
                }
            }
        });

        await prisma.temporada.deleteMany({
            where: { serieId: result.id}
        });

        await prisma.serie.delete({
            where: {id: id}
        });

        return;
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error(`Erro ao deletar serie com id: ${id}`);
    }
};