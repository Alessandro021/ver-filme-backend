import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";


type IFilmeProps = Partial<Omit<IFimes, "id">>

export const updateFilmeByIdProvider = async (id: string, filme: IFilmeProps): Promise<void | Error> => {
   
    try {
        const result = await prisma.filme.update({
            where: { id: id },
            data: filme
        });
 
        if(result){
            return;
        } else {
            return Error(`Erro ao atulizar o filme com ID: ${id}`);
        }

    } catch (error) {
        console.log(`ERRO AO ATULIZAR FIME: ${error}`);
        return Error(`Erro ao atulizar o filme com ID: ${id}`);
    }
};