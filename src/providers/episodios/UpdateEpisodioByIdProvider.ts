import { IEpisodios } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


interface IEpisodioProps extends Omit<IEpisodios, "id">{}

export const updateEpisodioByIdProvider = async (id: string, episodio: IEpisodioProps): Promise< void | Error> => {
    try {

        const result = await prisma.episodio.updateMany({
            where: { id: id },
            data: episodio
        });

        if(result.count > 0){
            return;
        } else {
            return Error(`Erro ao atulizar o episodio com ID: ${id}`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao atualizar episodio");
    }
};