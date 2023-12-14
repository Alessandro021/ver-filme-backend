

export interface IFimes {
    id: string;
    imagem_fundo: string;
    titulo: string;
    descricao: string;
    popularidade?: number;
    genero: string[];
    categoria: string;
    poster: string;
    data: string;
    file: string;
    treiler?: string | null;
    voto_medio?: number;
    duracao?: number
 }