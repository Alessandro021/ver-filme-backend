
export interface  ITemporada {
    id: string;
    titulo_temporada: string;
}

export interface  ISerie extends ITemporada {
    id: string;
    linguagem?: string;
    titulo: string;
    descricao: string;
    popularidade?: number;
    genero: Array<string>
    poster: string;
    data: string;
    video?: string;
    trailer?: string;
    voto_medio: number;
}