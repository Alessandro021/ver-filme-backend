import { ITemporadaReturn } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface ITemporadaProps extends Omit<ITemporadaReturn, "id" | "episodios"> {}

export const updateTemporadaByIdProvider = async (id: string, temporada: ITemporadaProps): Promise<void | Error> => {
    
    try {

        const result = await prisma.temporada.updateMany({
            where: {id: id},
            data: temporada

        });

        if(result.count > 0){
            return;
        } else {
            return Error(`Erro ao atulizar o temporada com ID: ${id}`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao atualizar temporada");
    }
};