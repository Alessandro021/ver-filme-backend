import { prisma } from "../../database/prisma";


export const deleteEpisodioByIdProvider = async (episodioId: string): Promise<void | Error> => {
    try {
        
        const episodio = await prisma.episodio.delete({
            where: { id: episodioId },
        });

        if(episodio){
            return;
        } else {
            return Error(`Erro ao deletar episodio com id ${episodioId}`);
        }

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao deletar episodio");
    }
};