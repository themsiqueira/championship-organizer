import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TeamController from './app/controllers/TeamController';
import GamesController from './app/controllers/GamesController';
import ChampionshipController from './app/controllers/ChampionshipController';
import RankingController from './app/controllers/RankingController';

import authMiddleware from './app/middlewares/auth';
import { validationStoreSessionMiddleware } from './app/middlewares/validateSession';
import {
  validationStoreUserMiddleware,
  validationUpdateUserMiddleware,
} from './app/middlewares/validateUser';

const routes = new Router();

/**
 * @api {post} /login Login
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "email": "seuemailcadastrado@gmail.com",
 *      "password": "seupasswordcadasrado"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *                "id": 1,
 *                "name": "Seu Nome Cadastrado",
 *                "email": "seuemailcadastrado@gmail.com",
 *              },
 *      "token": "awdiojawdoiisjvelisecaldwjljiafkamiolclc",
 *    }
 */

routes.post(
  '/api/login',
  validationStoreSessionMiddleware,
  SessionController.store
);

/**
 * @api {post} /newUser Novo usuário
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "name": "Seu Nome Cadastrado"
 *      "email": "seuemailcadastrado@gmail.com",
 *      "password": "seupasswordcadasrado"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Seu Nome Cadastrado",
 *      "email": "seuemailcadastrado@gmail.com",
 *    }
 */

routes.post(
  '/api/newUser',
  validationStoreUserMiddleware,
  UserController.store
);

routes.use(authMiddleware);

/**
 * @api {put} /updateUser Atualização de usuário
 * @apiGroup User
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "name": "Aqui vai seu nome obrigatório, caso queira alterar mande um novo",
 *      "email": "Aqui vai seu email obrigatório, caso queira alterar mande um novo caso",
 *      "oldPassword": "Aqui vai sua senha antiga caso pre queira mudar",
 *      "confirmPassword": "Aqui vai sua senha nova de novo para confirmação"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Seu Nome Cadastrado",
 *      "email": "seuemailnovocadastrado@gmail.com",
 *    }
 */

routes.put(
  '/api/updateUser',
  validationUpdateUserMiddleware,
  UserController.update
);


/**
 * @api {put} /newTeam Cria novo time
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *  [
 *    {
 *      name: yourTeamName,
 *    },
 *    {
 *      name: yourTeamNameTo,
 *    }
 *  ]
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Seu Nome Cadastrado",
 *      "email": "seuemailnovocadastrado@gmail.com",
 *    }
 */

routes.post('/api/newTeam', TeamController.store);

export default routes;
