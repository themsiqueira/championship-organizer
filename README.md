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

# Extras

  A Documentação foi criada com apidoc e se encontra na pasta public/apidoc,
  para visualizar abrir o arquivo index.html desta pasta no navegador.

  Também está no projeto as requisições para postman e insominia, você pode encontra-las
  na pasta collections, para usar é so importar as mesmas nos apps.

# Rotas

- Url base:

  `http://localhost:3333/api`

> Obs: a porta pode ser configurada no arquivo server.js, ao mudar a porta também é necessário mudar o script de debug
