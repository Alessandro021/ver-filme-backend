import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";

interface IFilmeProps extends Omit<IFimes, "id">{
    linguagem: string
    popularidade: number
    video: string
    trailer: string
}
interface IIdProps{
    id: string;
}

export const createFilmeProvider = async (filme: IFilmeProps ): Promise<{} | Error> => {

    // if(typeof filme.linguagem !== "string" || typeof filme.popularidade !== "number"){
    //     return Error("Erro ao registrar Filme")
    // }
    try {
        const data: IIdProps = await prisma.filme.create({
            data: filme,
            select: { id: true}
        });

        if(data){
            return data;
        }

        return Error("Erro ao registrar Filme");
    } catch (error) {
        console.log(error);
        return Error("Erro ao registrar Filme");
    }


};