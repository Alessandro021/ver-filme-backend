

export interface IFimes {
    id: string;
    imagem_fundo: string;
    titulo: string;
    descricao: string;
    popularidade?: number;
    genero: string[];
    categoria: string[];
    poster: string;
    data: string;
    file: string;
    treiler?: string | null;
    voto_medio?: number;
    duracao?: number
 }

export const ArrayGeneros = [
    "ação", 
    "aventura", 
    "animação", 
    "comédia", 
    "crime",
    "documentário",
    "drama",
    "família",
    "fantasia", 
    "história",
    "terror", 
    "música",
    "mistério",
    "romance",
    "ficção científica",
    "nacional",
    "suspense",
    "guerra",
    "faroeste"
];