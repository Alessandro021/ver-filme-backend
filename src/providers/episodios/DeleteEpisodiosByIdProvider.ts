import { prisma } from "../../database/prisma";



export const deleteEpisodiosByIdProvider = async (episodiosId: string[]) : Promise<{} | Error> => {
    try {
        
        const episodios = await prisma.episodio.deleteMany({
            where: {
                //USANDO O [OR]  PARA CRIAR UMA CONDIÇÃO QUE VERIFICA SE O ID DO EPISÓDIO ESTÁ CONTIDO NO ARRAY DE IDS FORNECIDO. 
                OR: episodiosId.map(id => ({
                    id: id,
                }))
            }
        });

        if(episodios){
            return episodios;
        } else {
            return Error("Erro ao deletar episodios");
        }

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao deletar episodios");
    }
};