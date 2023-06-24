import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";


interface IFilmeProps extends Omit<IFimes, "id">{}

export const updateFilmeByIdProvider = async (id: string, filme: IFilmeProps): Promise<void | Error> => {

    // vefifica se alguma strinq do array possui algum numerico, caso tenha ele retorna o numerico e com isso bloqueia o envio ao banco de dados
    const isString: string[] = filme.genero.filter(g => g.match(/\d+/));

    if( isString.length !== 0 || filme.genero.every((genero) => typeof genero === "string"||filme.genero.length < 0) === false){
        return Error("Error a propriedade genero nao pode conter numero");
    }
   
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
        console.log(`ERRO AO ATULIZAR FILME: ${error}`);
        return Error(`Erro ao atulizar o filme com ID: ${id}`);
    }
};