import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";

interface IFilmeProps extends Omit<IFimes, "id">{}

interface IIdProps{
    id: string;
}

export const createFilmeProvider = async (filme: IFilmeProps ): Promise<{} | Error> => {

    // if(typeof filme.linguagem !== "string" || typeof filme.popularidade !== "number"){
    //     return Error("Erro ao registrar Filme")
    // }
    
    // vefifica se alguma strinq do array possui algum numerico, caso tenha ele retorna o numerico e com isso bloqueia o envio ao banco de dados
    const isString = filme.genero.filter(g => g.match(/\d+/));

    if( isString.length !== 0 || filme.genero.every((genero) => typeof genero === "string"||filme.genero.length < 0) === false){
        return Error("Erro ao registrar Filme");
    }

    try {
        const data: IIdProps = await prisma.filme.create({
            data: filme ,
            select: { id: true}
        });

        if(data){
            return data;
        } else {
            return Error("Erro ao registrar Filme");
        }
    } catch (error) {
        console.log(error);
        return Error("Erro ao registrar Filme");
    }


};