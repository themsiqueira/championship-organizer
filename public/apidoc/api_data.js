define({ "api": [
  {
    "type": "get",
    "url": "/getAllChampionships",
    "title": "Busca todos o campeonatos",
    "group": "Championship",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Sucess to find championships\",\n   \"championships\": [\n     {\n       \"id\": 5,\n       \"title\": \"Campeonato Brasileiro\",\n       \"complete\": false,\n       \"createdAt\": \"2019-12-02T17:14:49.772Z\",\n       \"updatedAt\": \"2019-12-02T17:14:49.772Z\",\n       \"user_id\": 1\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Championship",
    "name": "GetGetallchampionships"
  },
  {
    "type": "get",
    "url": "/getAllGames",
    "title": "Busca jogos pelo id do campeonato",
    "group": "Championship",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "championshipId",
            "description": "<p>Query param</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n   \"games\": [\n       {\n           \"id\": 37,\n           \"first_team_goals\": 0,\n           \"second_team_goals\": 0,\n           \"complete\": false,\n           \"createdAt\": \"2019-12-02T17:14:49.834Z\",\n           \"updatedAt\": \"2019-12-02T17:14:49.834Z\",\n           \"championship_id\": 5,\n           \"first_team_id\": 1,\n           \"second_team_id\": 2,\n           \"first_team\": {\n               \"name\": \"Flamengo\",\n               \"id\": 1\n           },\n           \"second_team\": {\n               \"name\": \"Sao Paulo\",\n               \"id\": 2\n           }\n       },\n       {\n           \"id\": 38,\n           \"first_team_goals\": 0,\n           \"second_team_goals\": 0,\n           \"complete\": false,\n           \"createdAt\": \"2019-12-02T17:14:49.835Z\",\n           \"updatedAt\": \"2019-12-02T17:14:49.835Z\",\n           \"championship_id\": 5,\n           \"first_team_id\": 1,\n           \"second_team_id\": 3,\n           \"first_team\": {\n               \"name\": \"Flamengo\",\n               \"id\": 1\n           },\n           \"second_team\": {\n               \"name\": \"Corinthians\",\n               \"id\": 3\n           }\n       }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Championship",
    "name": "GetGetallgames"
  },
  {
    "type": "get",
    "url": "/getRanking",
    "title": "Busca ranking por Id do campeonato",
    "group": "Championship",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "championshipId",
            "description": "<p>Query param</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Sucess to find ranking\",\n   \"ranking\": [\n     {\n        \"id\": 2,\n        \"victories\": 9,\n        \"position\": 1,\n        \"points\": 3,\n        \"goals\": 3,\n        \"pro_goals\": 3,\n        \"createdAt\": \"2019-12-02T17:14:53.342Z\",\n        \"updatedAt\": \"2019-12-03T12:40:58.584Z\",\n        \"championship_id\": 5,\n        \"team_id\": 1,\n        \"team\": {\n          \"name\": \"Flamengo\",\n          \"id\": 1\n        }\n     },\n     {\n        \"id\": 4,\n        \"victories\": 0,\n        \"position\": 2,\n        \"points\": 0,\n        \"goals\": 0,\n        \"pro_goals\": 0,\n        \"createdAt\": \"2019-12-02T17:14:53.343Z\",\n        \"updatedAt\": \"2019-12-03T12:40:58.586Z\",\n        \"championship_id\": 5,\n        \"team_id\": 2,\n        \"team\": {\n          \"name\": \"Sao Paulo\",\n          \"id\": 2\n        }\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Championship",
    "name": "GetGetranking"
  },
  {
    "type": "post",
    "url": "/newChampionship",
    "title": "Create a championship",
    "group": "Championship",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"title\": \"Campeonato Brasileiro\",\n  \"teams\": [1,2,3,4]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess to create championship\",\n  \"championship\": {\n       \"id\": 5,\n       \"title\": \"Campeonato Brasileiro\",\n       \"user_id\": 1,\n       \"updatedAt\": \"2019-12-02T17:14:49.772Z\",\n       \"createdAt\": \"2019-12-02T17:14:49.772Z\",\n       \"complete\": false\n   },\n   \"games\": [\n       {\n           \"championship_id\": 5,\n           \"first_team_id\": 1,\n           \"second_team_id\": 2\n       },\n       {\n           \"championship_id\": 5,\n           \"first_team_id\": 1,\n           \"second_team_id\": 3\n       }\n   ],\n   \"rankings\": [\n       {\n           \"team_id\": 3,\n           \"championship_id\": 5,\n           \"position\": 1\n       },\n      {\n           \"team_id\": 1,\n           \"championship_id\": 5,\n           \"position\": 2\n       }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Championship",
    "name": "PostNewchampionship"
  },
  {
    "type": "put",
    "url": "/updateGame",
    "title": "Atualiza status do jogo e o ranking",
    "group": "Championship",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n   \"gameId\": 37,\n   \"firstTeamGoals\": 3,\n   \"secondTeamGoals\": 0,\n   \"firstTeamProGoals\": 3,\n   \"secondTeamProGoals\": 0\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Sucess to update Game and ranking\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Championship",
    "name": "PutUpdategame"
  },
  {
    "type": "delete",
    "url": "/deleteTeam",
    "title": "Deleta o time por ID",
    "group": "Teams",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n   \"id\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess to delete team\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Teams",
    "name": "DeleteDeleteteam"
  },
  {
    "type": "get",
    "url": "/getAllTeams",
    "title": "Busca times criados pelo usuário",
    "group": "Teams",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess to find teams\",\n  \"teams\": [\n              {\n                \"id\": 2,\n                \"name\": \"Flamengo\",\n                \"user_id\": 1,\n                \"updatedAt\": \"2019-12-02T13:37:17.205Z\",\n                \"createdAt\": \"2019-12-02T13:37:17.205Z\"\n              },\n              {\n                \"id\": 1,\n                \"name\": \"Sao Paulo\",\n                \"user_id\": 1,\n                \"updatedAt\": \"2019-12-02T13:37:17.204Z\",\n                \"createdAt\": \"2019-12-02T13:37:17.204Z\"\n              }\n            ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Teams",
    "name": "GetGetallteams"
  },
  {
    "type": "get",
    "url": "/getTeamByName",
    "title": "Busca time por nome",
    "group": "Teams",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Query param</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess to find team\",\n  \"team\": {\n               \"id\": 1,\n               \"name\": \"Sao Paulo\",\n               \"user_id\": 1,\n               \"updatedAt\": \"2019-12-02T13:37:17.204Z\",\n               \"createdAt\": \"2019-12-02T13:37:17.204Z\"\n          }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Teams",
    "name": "GetGetteambyname"
  },
  {
    "type": "post",
    "url": "/newTeam",
    "title": "Cria novo time",
    "group": "Teams",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n   \"teams\": [\n     {\n       \"name\": \"Flamengo\"\n     },\n     {\n       \"name\": \"Sao Paulo\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess create new record\",\n  \"result\": [\n              {\n                \"id\": 2,\n                \"name\": \"Flamengo\",\n                \"user_id\": 1,\n                \"updatedAt\": \"2019-12-02T13:37:17.205Z\",\n                \"createdAt\": \"2019-12-02T13:37:17.205Z\"\n              },\n              {\n                \"id\": 1,\n                \"name\": \"Sao Paulo\",\n                \"user_id\": 1,\n                \"updatedAt\": \"2019-12-02T13:37:17.204Z\",\n                \"createdAt\": \"2019-12-02T13:37:17.204Z\"\n              }\n            ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Teams",
    "name": "PostNewteam"
  },
  {
    "type": "put",
    "url": "/updateTeam",
    "title": "Atualiza nome do time",
    "group": "Teams",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n   \"id\": 1,\n   \"newName\": \"Tricolor\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Sucess to update team\",\n  \"team\": {\n               \"id\": 1,\n               \"name\": \"Tricolor\",\n               \"user_id\": 1,\n               \"updatedAt\": \"2019-12-02T14:07:25.544Z\",\n               \"createdAt\": \"2019-12-02T13:37:17.204Z\"\n          }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Teams",
    "name": "PutUpdateteam"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "group": "User",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"email\": \"joao@gmail.com\",\n  \"password\": \"senhaProvisoria\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n            \"id\": 1,\n            \"name\": \"Joao\",\n            \"email\": \"Joao@gmail.com\",\n          },\n  \"token\": \"awdiojawdoiisjvelisecaldwjljiafkamiolclc\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/newUser",
    "title": "Novo usuário",
    "group": "User",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n   \"name\": \"Joao\",\n   \"email\": \"Joao@gmail.com\",\n   \"password\": \"senhaProvisoria\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Joao\",\n  \"email\": \"Joao@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PostNewuser"
  },
  {
    "type": "put",
    "url": "/updateUser",
    "title": "Atualização de usuário",
    "group": "User",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "description": "<p>Os Parametros de password são opcionais, envie somente caso queira alterar a senha</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"name\": \"Joao Souza\",\n  \"email\": \"JoaoSouza@gmail.com\",\n  \"oldPassword\": \"senhaProvisoria\",\n  \"password\": \"novaSenhaProvisoria\",\n  \"confirmPassword\": \"novaSenhaProvisoria\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Joao\",\n  \"email\": \"JoaoNovoEmail@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PutUpdateuser"
  }
] });
