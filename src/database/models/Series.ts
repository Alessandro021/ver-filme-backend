interface  ITemporada {
    id: string;
    titulo_temporada: string;
    num_episodios: number;
    episodios: IEpisodios[]
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
    trailer?: string;
    voto_medio: number;
}

export interface IEpisodios{
    id?: string;
    titulo?: string;
    descricao?: string;
    data?: string;
    poster?: string;
    voto_medio?: number;
    video?: string;
}

/**
 * A INTERFACE ISerie SERVE PARA A PARTE DO CONTROLE, JA A ISerieReturn SERVA PARA A AREA DO PROVIDER
 */

export interface  ISerieRetun extends ISerie{
    temporada: ITemporadaReturn[]
}

export interface  ITemporadaReturn {
    id: string;
    titulo: string;
    num_episodios: number;
    episodios: IEpisodiosReturn[]
}
interface IEpisodiosReturn extends IEpisodios{}
