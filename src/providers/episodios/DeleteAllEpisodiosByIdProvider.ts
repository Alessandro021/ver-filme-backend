import { prisma } from "../../database/prisma";


export const deleteAllEpisodiosByIdProvider = async (temporadaId: string): Promise<void | Error> => {
    
    try {
        
        const episodios = await prisma.episodio.deleteMany({
            where: {temporadaId: temporadaId},
        });
        console.log(episodios);

        if(episodios){
            return;
        } else {
            return Error("Erro ao deletar episodios");
        }

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao deletar episodios");
    }
};