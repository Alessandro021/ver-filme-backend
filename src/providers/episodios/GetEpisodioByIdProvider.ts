import { IEpisodios } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface IEpisodioProps extends IEpisodios{
    temporadaId: string;
}

export const getEpisodioByIdProvider = async (id: string): Promise<IEpisodioProps | Error> => {
    try {
        const episodio = await prisma.episodio.findFirst({
            where: {
                id: id
            }
        });

        if(episodio){
            return episodio;
        } else {
            return Error(`Erro, episodio com id: ${id} não existe`);
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao busca episodio");
    }
};
