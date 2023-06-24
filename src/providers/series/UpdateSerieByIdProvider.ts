import { ISerie } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


interface ISerieProps extends Omit<ISerie, "id" | "num_episodios" | "titulo_temporada">{}

export const updateSerieByIdProvider = async (id: string, serie: ISerieProps): Promise<void | Error> => {
    
    try {
        
        const result = await prisma.serie.updateMany({
            where: {id: id},
            data: serie
        });

        if(result.count > 0){
            return;
        } else {
            return Error(`Erro ao atulizar o serie com ID: ${id}`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao atualizar serie");
    }
};