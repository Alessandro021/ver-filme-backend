export interface  ITemporada {
    id: string;
    "titulo_temporada": string;
    num_episodios: number;
}

export interface  ISerie extends ITemporada {
    id: string;
    linguagem: string;
    titulo: string;
    descricao: string;
    popularidade?: number;
    genero: string
    poster: string;
    imagem_fundo?: string;
    data: string;
    video?: string;
    trailer?: string;
    voto_medio: number;
}

/**
 * A INTERFACE ISerie SERVE PARA A PARTE DO CONTROLE, JA A ISerieReturn SERVA PARA A AREA DO PROVIDER
 */

export interface  ISerieRetun extends ISerie{
    // id: string;
    // linguagem: string;
    // titulo: string;
    // descricao: string;
    // popularidade?: number;
    // genero: string
    // poster: string;
    // data: string;
    // video?: string;
    // trailer?: string;
    // voto_medio: number;
    temporada: ITemporadaReturn[]
 
}

interface  ITemporadaReturn {
    id: string;
    titulo: string;
    num_episodios: number;
}
