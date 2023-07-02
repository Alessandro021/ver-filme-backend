import { prisma } from "../../database/prisma";



export const deleteEpisodiosByIdsProvider = async (temporadaId: string, episodiosId: string[]) : Promise<{} | Error> => {
    try {

        const temporada = await prisma.temporada.findFirst({
            where: {
                id: temporadaId
            }
        });

        if(!temporada){
            return Error(`Erro id: ${temporadaId} da temporada, não exites!`);
        }
        
        const episodios = await prisma.episodio.deleteMany({
            where: {
                temporadaId: temporadaId,
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