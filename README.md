# Championship Organizzer

Api REST para organização de campeonatos de futebol.

# Como configurar o projeto:

### 1. Instale o NodeJS

- _NodeJS:_ https://nodejs.org/en/

### 2. Instale o yarn ou npm

- _yarn:_ https://yarnpkg.com/lang/en/

- _npm:_ https://www.npmjs.com/get-npm

### 3. Instale docker CE ou toolbox  para rodar o banco de dados:

  - _Docker CE:_ https://hub.docker.com/editions/community/docker-ce-desktop-windows

  - _Docker Toolbox:_ https://docs.docker.com/toolbox/toolbox_install_windows/

  > Obs: Os links acima são para instalação no Windows, mas no plataforma você encontrará a documentação para outros SO's.

# Rodando o projeto:

 >Recomendação: Para debugar utilizar visual studio code.

Inicialize o server e o banco de dados:

  `docker-compose up -d`

  Obs: Este comando inicializa o container do database em backgroud,
  caso queira parar o container utilize o comando abaixo.

  `docker-compose stop`

Instale as dependências do projeto:

  `yarn install`

  ou

  `npm install`

Antes de iniciar o projeto rode as migrations para modelar o banco:

  > Obs: Ip padrão do docker configurado no .env, caso em sua maquina seja outro será necessário alterar no .env.

  `yarn migrate`

  Obs: Caso queira desfazer a modelagem utilize o comando abaixo.

  `yarn undo-migrate`

## Comandos disponíveis

Abaixo temos alguns comandos úteis para debug, execução e executar testes.

- Executar o projeto localmente:

  `yarn dev` ou `npm run dev`

- Executar o projeto no vscode em modo debug:

  `yarn debug` ou `npm run debug`

- Executar os testes com o jest:

  `yarn test` ou `npm run test`

  >Obs: Para rodar os testes vocês deve alterar o arquivo .env apontando o panco para test

# Extras

  A Documentação foi criada com apidoc e se encontra na pasta `public/apidoc`,
  para visualizar abrir o arquivo index.html desta pasta no navegador.

  O coverage de testes que foi gerado durante o desenvolvimento esta na pasta `__tests__/coverage`,
  é possivel visualiza-lo abrindo o index.html no navegador.

  Também está no projeto as requisições para postman e insominia, você pode encontra-las
  na pasta collections, para usar é so importar as mesmas nos apps.

# Rotas

- Url base:

  `http://localhost:3333/api`

> Obs: a porta pode ser configurada no arquivo server.js, ao mudar a porta também é necessário mudar o script de debug

#### Criação de usuário:

Tipo: POST

Endpoint:
`/newUser`

Body:

```
  {
    "name": "Joao",
    "email": "Joao@gmail.com",
    "password": "senhaProvisoria"
  }
```

Retorno:

```
  {
    "id": "1",
    "name": "Joao"
    "email": "Joao@gmail.com"
  }
```

#### Login de usuário (Auth):

Tipo: POST
Endpoint:
`/login`

Body:

```
  {
    "email": "Joao@gmail.com",
    "password": "senhaProvisoria"
  }
```

Retorno:

```
  {
   "user": {
     "id": "1",
     "name": "Joao"
     "email": "Joao@gmail.com"
   },
   "token": "token jwt gerado"
  }

```

#### Atualização de usuário:

Tipo: PUT
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/updateUser`

  >Obs: os parametros name e email são obrigatorios

Body:

```
  {
    "name": "Joao Souza",
    "email": "JoaoSouza@gmail.com",
    "oldPassword": "senhaProvisoria",
    "password": "novaSenhaProvisoria",
    "confirmPassword": "novaSenhaProvisoria"
  }
```

Retorno:

```
{
  "id": "1",
  "name": "Joao Souza"
  "email": "JoaoSouza@gmail.com"
}

```

#### Novo Time:

Tipo: POST
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/newTeam`

  >Obs: se pode criar N times ao mesmo tempo, caso algum dos times ja exista ele não é cadastrado

Body:

```
  {
    "teams": [
      {
        "name": "Flamengo",
      },
      {
        "name": "Sao Paulo"
      }
    ]
  }
```

Retorno:

```
  {
    "message": "Sucess create new record",
    "result": [
                {
                  "id": 2,
                  "name": "Flamengo",
                  "user_id": 1,
                  "updatedAt": "2019-12-02T13:37:17.205Z",
                  "createdAt": "2019-12-02T13:37:17.205Z"
                },
                {
                  "id": 1,
                  "name": "Sao Paulo",
                  "user_id": 1,
                  "updatedAt": "2019-12-02T13:37:17.204Z",
                  "createdAt": "2019-12-02T13:37:17.204Z"
                }
              ]
  }

```

#### Busca times:

Tipo: GET
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/getAllTeams`

  >Obs: busca todos os times vinculados ao seu perfil

Retorno:

```
  {
    "message": "Sucess to find teams",
    "result": [
                {
                  "id": 2,
                  "name": "Flamengo",
                  "user_id": 1,
                  "updatedAt": "2019-12-02T13:37:17.205Z",
                  "createdAt": "2019-12-02T13:37:17.205Z"
                },
                {
                  "id": 1,
                  "name": "Sao Paulo",
                  "user_id": 1,
                  "updatedAt": "2019-12-02T13:37:17.204Z",
                  "createdAt": "2019-12-02T13:37:17.204Z"
                }
              ]
  }

```

#### Busca time por nome:

Tipo: GET
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/getAllTeams`

  >Obs: Parametro deve ser enviado via query param na URL
  >Obs_2: busca time por nome, porem somente vinculados ao seu perfil

Query:

```
  { name: "Flamengo"}
```

Retorno:

```
  {
    "message": "Sucess to find team",
    "team": {
              "id": 2,
              "name": "Flamengo",
              "user_id": 1,
              "updatedAt": "2019-12-02T13:37:17.205Z",
              "createdAt": "2019-12-02T13:37:17.205Z"
            }
  }

```

#### Update de time:

Tipo: PUT
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/updateTeam`

  >Obs: Somente atualiza times vinculados ao seu perfil

Body:

```
  {
    "id": 1,
    "newName": "Tricolor"
  }
```

Retorno:

```
  {
    "message": "Sucess to update team",
    "team": {
              "id": 1,
              "name": "Tricolor",
              "user_id": 1,
              "updatedAt": "2019-12-02T13:37:17.205Z",
              "createdAt": "2019-12-02T13:37:17.205Z"
            }
  }

```

#### Exclusão de time:

Tipo: PUT
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/updateTeam`

  >Obs: Somente exclui times vinculados ao seu perfil

Body:

```
  {
    "id": 1,
  }
```

Retorno:

```
  {
    "message": "Sucess to delete team",
  }

```

#### Cria Campeonato:

Tipo: POST
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/newChampionship`

  >Obs: Somente usa times vinculados ao seu perfil.
  >Obs_2: Devem ser enviados no minimo 'ids de quatro times.

Body:

```
  {
    "title": "Campeonato Brasileiro Serie A"
    "teams": [1, 2, 3, 4],
  }
```

Retorno:

```
  {
    "message": "Sucess to create championship",
    "championship": {
        "id": 5,
        "title": "Campeonato Brasileiro",
        "user_id": 1,
        "updatedAt": "2019-12-02T17:14:49.772Z",
        "createdAt": "2019-12-02T17:14:49.772Z",
        "complete": false
    },
    "games": [
        {
            "championship_id": 5,
            "first_team_id": 1,
            "second_team_id": 2
        },
        {
            "championship_id": 5,
            "first_team_id": 1,
            "second_team_id": 3
        }
    ],
    "rankings": [
        {
            "team_id": 3,
            "championship_id": 5,
            "position": 1
        },
        {
            "team_id": 1,
            "championship_id": 5,
            "position": 2
        }
    ]
  }

```

#### Busca de Campeonatos:

Tipo: GET
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/getAllChampionships`

Retorno:

```
  {
    "message": "Sucess to find championships",
    "championships": [
      {
        "id": 5,
        "title": "Campeonato Brasileiro",
        "complete": false,
        "createdAt": "2019-12-02T17:14:49.772Z",
        "updatedAt": "2019-12-02T17:14:49.772Z",
        "user_id": 1
      }
    ]
  }

```

#### Busca jogos pelo id do campeonato:

Tipo: GET
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/getAllGames`

  >Obs: Parametro deve ser enviado via query param na URL

Query:

```
  { championshipId: 5}
```

Retorno:

```
  {
    "games": [
        {
            "id": 37,
            "first_team_goals": 0,
            "second_team_goals": 0,
            "complete": false,
            "createdAt": "2019-12-02T17:14:49.834Z",
            "updatedAt": "2019-12-02T17:14:49.834Z",
            "championship_id": 5,
            "first_team_id": 1,
            "second_team_id": 2,
            "first_team": {
                "name": "Flamengo",
                "id": 1
            },
            "second_team": {
                "name": "Sao Paulo",
                "id": 2
            }
        },
        {
            "id": 38,
            "first_team_goals": 0,
            "second_team_goals": 0,
            "complete": false,
            "createdAt": "2019-12-02T17:14:49.835Z",
            "updatedAt": "2019-12-02T17:14:49.835Z",
            "championship_id": 5,
            "first_team_id": 1,
            "second_team_id": 3,
            "first_team": {
                "name": "Flamengo",
                "id": 1
            },
            "second_team": {
                "name": "Corinthians",
                "id": 3
            }
        }
    ]
  }

```

#### Atualiza status do jogo e o ranking:

Tipo: PUT
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/updateGame`

Body:

```
  {
    "gameId": 37,
    "firstTeamGoals": 3,
    "secondTeamGoals": 0,
    "firstTeamProGoals": 3,
    "secondTeamProGoals": 0
  }
```

Retorno:

```
  {
    "message": "Sucess to update Game and ranking"
  }

```

#### Busca ranking por Id do campeonato:

Tipo: GET
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/getRanking`

  >Obs: Parametro deve ser enviado via query param na URL

Query:

```
  { championshipId: 5}
```

Retorno:

```
  {
    "message": "Sucess to find ranking",
    "ranking": [
      {
        "id": 2,
        "victories": 9,
        "position": 1,
        "points": 3,
        "goals": 3,
        "pro_goals": 3,
        "createdAt": "2019-12-02T17:14:53.342Z",
        "updatedAt": "2019-12-03T12:40:58.584Z",
        "championship_id": 5,
        "team_id": 1,
        "team": {
          "name": "Flamengo",
          "id": 1
        }
      },
      {
        "id": 4,
        "victories": 0,
        "position": 2,
        "points": 0,
        "goals": 0,
        "pro_goals": 0,
        "createdAt": "2019-12-02T17:14:53.343Z",
        "updatedAt": "2019-12-03T12:40:58.586Z",
        "championship_id": 5,
        "team_id": 2,
        "team": {
          "name": "Sao Paulo",
          "id": 2
        }
      }
    ]
  }

```
