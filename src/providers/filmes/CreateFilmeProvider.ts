import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";

export const createFilmeProvider = async (filme: IFimes ): Promise<IFimes | Error> => {
    
    // vefifica se alguma strinq do array possui algum numerico, caso tenha ele retorna o numerico e com isso bloqueia o envio ao banco de dados
    const isString = filme.genero.filter(g => g.match(/\d+/));

    if( isString.length !== 0 || filme.genero.every((genero) => typeof genero === "string"||filme.genero.length < 0) === false){
        return Error("Erro ao registrar Filme");
    }

    try {
        const filmeExist = await prisma.filme.findFirst({
            where: {file: filme.file}
        });

        if(filmeExist){
            return Error(`O filme ${filme.titulo}, já esta cadastrado!`);
        }
        
        const data = await prisma.filme.create({
            data: filme ,
            select: { 
                id: true,
                categoria: true,
                data: true,
                descricao: true,
                duracao: true,
                file: true,
                genero: true,
                imagem_fundo: true,
                popularidade: true,
                poster: true,
                titulo: true,
                treiler: true,
                type: true,
                voto_medio: true,
            }
        });

        if(data){
            return data;
        } else {
            return Error("Houve um erro ao registrar Filme");
        }
    } catch (error) {
        // console.log(error);
        return Error("Erro ao registrar Filme");
    } finally {
        await prisma.$disconnect();
    }


};