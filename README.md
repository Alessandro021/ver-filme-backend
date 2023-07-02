# **Api Ver Filme e Series**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/Alessandro021/ver-filme-backend)](https://github.com/Alessandro021/ver-filme-backend/issues)
![GitHub repo size](https://img.shields.io/github/repo-size/alessandro021/ver-filme-backend)
![GitHub contributors](https://img.shields.io/github/contributors/alessandro021/ver-filme-backend)
![GitHub forks](https://img.shields.io/github/forks/Alessandro021/ver-filme-backend?style=social)
![GitHub stars](https://img.shields.io/github/stars/alessandro021/ver-filme-backend?style=social)


<p align="justify" >
Este projeto é uma oportunidade para que eu possa aprimorar meus conhecimentos em desenvolvimento de APIs utilizando Node.js, MongoDB como banco de dados NoSQL, TypeScript e o ORM Prisma. A proposta do projeto consiste em criar uma API de catálogo de filmes e séries, proporcionando aos usuários a possibilidade de visualizar a lista de filmes e séries disponíveis. Além disso, o administrador terá permissão para adicionar novos filmes e séries, bem como realizar operações de atualização, exclusão e obtenção de informações sobre filmes, séries, episódios e temporadas. O objetivo é fornecer uma solução completa para o gerenciamento e consulta de conteúdos audiovisuais, oferecendo uma experiência aprimorada aos usuários. Com a utilização das tecnologias mencionadas, será possível criar uma API robusta e eficiente, garantindo uma interação fluida entre os usuários e o catálogo de filmes e séries.
</p>

## **Tecnologias Utilizadas**
- [`NodeJs`](https://nodejs.org/en)
- [`TypeScript`](https://www.typescriptlang.org/)
- [`Prisma`](https://www.prisma.io/)
- [`MongoDb`](https://www.mongodb.com/)
- [`Yup`](https://github.com/jquense/yup)

## **Funcionalidades do server**

- `Realizar cadastro de usuario.`
- `Criar filmes, series, temporadas e episodios.`
- `Lista filmes, series, temporadas e episodios.`
- `Deletar filmes, series, temporadas e episodios.`
- `Atualizar filmes, series, temporadas e episodios.`

## **Como rodar o projeto**

1. Clone este repositório `git clone https://github.com/Alessandro021/ver-filme-backend.git`
2. Instale as dependências com `npm install` ou `yarn`
3. Configure as variáveis de ambiente no arquivo `.env` com as suas credenciais:
````js
DATABASE_URL=["CONEXAO COM BANCO DE DADOS"]
JWT_SECRET=["SUA CHAVE SECRETA"]
````
4. Apos adicionar as variaves de ambiente rode o comando `npm run generate` ou `yar generate`
5. Inicie o projeto com , `npm run start:dev` ou `yarn start:dev`.
O servidor estará disponível em `http://localhost:3333`.


## **Endpoints da Api**

### `Rota de Usuario`

+ Criar usuario: POST `http://localhost/cadastrar`
````json
//Parametros a serem passados
{
	"nome": "Usuario",
	"email": "usuario@email.com",
	"senha": "123456"
}
`````
+ Logar usuario: POST `http://localhost/entrar`
- Ao logar, o usuario tem como retorno um Token JWT para poder acessar as rortas que são autenticadas
````json
//Parametros a serem passados
{
	"email": "usuario@email.com",
	"senha": "123456"
}
````

+ Buscar usuario: GET `http://localhost/usuario/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//O ID DO USUARIO DEVE SER PASSADA NA URL DA REQUISIÇÂO
````

### `Rota de Filme`

+ Criar Filme: POST `http://localhost/create/filme`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
{
	"linguagem": "Portugues",
    "titulo": "O filme",
    "descricao": "descrição do filme",
    "popularidade": 12.000,
	"genero": ["Comédia", "Aventura"],
    "poster": "http://www.site.com.br",
	"imagem_fundo": "http://www.site.com.br",
    "data": "12/12/2022",
    "video": "http://www.site.com.br",
    "trailer": "http://www.site.com.br",
    "voto_medio": 60.30
}
````

+ Buscar Filmes: GET `http://localhost/filmes`
````json
//Parametros a serem passados 
//NÃO É NECESSARIO PASSAR NENHUMA INFORMAÇÃO
````

+ Buscar Filme po ID: GET `http://localhost/filme/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO FILME QUE DESEJA BUSCA NO CORPO DA URL
````

+ Atualizar Filme: UPDATE `http://localhost/filme/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO FILME QUE DESEJA ATUALIZAR NO CORPO DA URL

{
    //CAMPOS OPCIONAIS
	"linguagem": "Portugues",
    "titulo": "O filme",
    "descricao": "descrição do filme",
    "popularidade": 12.000,
	"genero": ["Comédia", "Aventura"],
    "poster": "http://www.site.com.br",
	"imagem_fundo": "http://www.site.com.br",
    "data": "12/12/2022",
    "video": "http://www.site.com.br",
    "trailer": "http://www.site.com.br",
    "voto_medio": 60.30
}
````

+ Deletar Filme por ID: DELETE `http://localhost/filme/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO FILME QUE DESEJA DELETAR NO CORPO DA URL
````

### `Rota de Serie`

+ Criar Serie: POST `http://localhost/create/serie`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
{
	"linguagem": "Portugues",
    "titulo": "Serie 1",
	"titulo_temporada": "Temporada 01",
	"num_episodios": 1,
    "descricao": "descrição da serie",
    "popularidade": 12.234,
	"genero": "comedia",
    "poster": "http://www.tudo.com.br",
	"imagem_fundo": "http://www.site.com.br",
    "data": "12/12/2022",
    "trailer": "http://www.site.com.br",
    "voto_medio": 60.30,
		"episodios": [
			{
				"titulo": "Teste 1",
				"data": "12/12/2022",
				"descricao": "descrição do episodio",
				"poster": "http://www.site.com.br",
				"voto_medio": 0,
				"video":"http://www.site.com.br"
			}
    //VARIOS OBJETOS DE EPISODIOS PODEM SER PASSADO AQUI
		]
}
````

+ Buscar Series: GET `http://localhost/serie`
````json
//Parametros a serem passados 
//NÃO É NECESSARIO PASSAR NENHUMA INFORMAÇÃO
````

+ Buscar Serie por ID: GET `http://localhost/serie/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA SERIE QUE DESEJA BUSCA NO CORPO DA URL
````

+ Atualizar Serie: UPDATE `http://localhost/serie/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA SERIE QUE DESEJA ATUALIZAR NO CORPO DA URL

{
    //CAMPOS OPCIONAIS
	"linguagem": "Portugues",
    "titulo": "Serie 1",
	"titulo_temporada": "Temporada 01",
	"num_episodios": 1,
    "descricao": "descrição da serie",
    "popularidade": 12.234,
	"genero": "comedia",
    "poster": "http://www.site.com.br",
	"imagem_fundo": "http://www.site.com.br",
    "data": "12/12/2022",
    "trailer": "http://www.site.com.br",
    "voto_medio": 60.30,
}
````

+ Deletar Serie por ID: DELETE `http://localhost/serie/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA SERIE QUE DESEJA DELETAR NO CORPO DA URL
````


### `Rota da Temporada`

+ Criar Temporada: POST `http://localhost/create/temporada`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
{
    "titulo": "Temporada 2",
	"num_episodios": 1,
	"serieId": "6498c924af01ed632ae9c8c6", //AQUI DEVE SER PASSADO O ID DA SERIE A QUAL A TEMPORADA SERA ADICIONADA
	"episodios": [
		{
            "titulo": "teste 1",
            "data": "12/12/2022",
            "descricao": "descrição do episodio",
            "poster": "http://www.site.com.br",
            "voto_medio": 0,
            "video":"http://www.site.com.br"
		}
        //VARIOS OBJETOS DE EPISODIOS PODEM SER PASSADO AQUI
	]

}
````

+ Buscar Todas as Temporadas de uma Serie por ID: GET `http://localhost/temporada/all/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA SERIE QUE DESEJA BUSCA AS TEMPORADA, NO CORPO DA URL
````

+ Buscar Serie por ID: GET `http://localhost/temporada/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA TEMPORADA QUE DESEJA BUSCA NO CORPO DA URL
````

+ Atualizar Temporada: UPDATE `http://localhost/temporada/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA TEMPORADA QUE DESEJA ATUALIZAR NO CORPO DA URL

{
    //CAMPOS OPCIONAIS
	"titulo": "TEMPORADA 1",
	"num_episodios": 3
}
````

+ Deletar todas as Temporadas de uma Serie por ID: DELETE `http://localhost/temporada/all/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA SERIE QUE DESEJA DELETAR TODAS AS TEMPORADAS,  NO CORPO DA URL
````

+ Deletar Temporada por ID: DELETE `http://localhost/temporada/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA TEMPORADA QUE DESEJA DELETAR NO CORPO DA URL
````

### `Rota da Episodio`

+ Criar Temporada: POST `http://localhost/create/episodio`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
{
    "temporadaId": "649a4039cb1ad8159c6a3b1e", //AQUI DEVE SER PASSADO O ID DA TEMPORADA A QUAL O EPESODIO SERA ADICIONADO
    "episodios": [
        {
            "titulo": "temporada final",
            "data": "12/12/1955",
            "descricao": "descrição do episodio",
            "poster": "http://www.site.com.br",
            "voto_medio": 0,
            "video":"http://www.site.com.br"
        }
        //VARIOS OBJETOS DE EPISODIOS PODEM SER PASSADO AQUI
    ]

}
````

+ Buscar Todos os Episodio de uma Temporada por ID: GET `http://localhost/episodio/all/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA TEMPORADA QUE DESEJA BUSCA OS EPISODIO, NO CORPO DA URL
````

+ Buscar episodio por ID: GET `http://localhost/episodio/id`
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO EPISODIO QUE DESEJA BUSCA NO CORPO DA URL
````

+ Atualizar Episodio: UPDATE `http://localhost/episodio/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO EPISODIO QUE DESEJA ATUALIZAR, NO CORPO DA URL

{
    //CAMPOS OPCIONAIS
	"titulo": "temporada final",
	"data": "12/12/2022",
	"descricao": "descrição do episodio",
	"poster": "http://www.site.com.br",
	"voto_medio": 1,
	"video":"http://www.site.com.br"
}
````

+ Deletar todos os Episodio de uma Temporada por ID: DELETE `http://localhost/episodio/all/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DA TEMPORADA QUE DESEJA DELETAR TODOS OS EPISODIOS,  NO CORPO DA URL
````

+ Deletar Episodios por ID: DELETE `http://localhost/episodio/id`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
//É NECESSARIO INFORMAR O ID DO EPISODIO QUE DESEJA DELETAR NO CORPO DA URL
````

+ Deletar Episodios Expecificos de uma Temporada, por IDs : DELETE `http://localhost/episodio`
- Essa rota é **autenticada** e somente quem estiver logado e possui um token JWT valido podera acessar
````json
//Parametros a serem passados 
{
	"temporadaId": "649e229050478a80405b028d",
	"episodiosId":[ "649e229050478a80405b028f", "649e229050478a80405b028e"]
}
````


## **Licença**
 
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.