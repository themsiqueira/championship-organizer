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

import {
  validationStoreTeamMiddleware,
  validationGetTeamByNameMiddleware,
  validationUpdateTeamMiddleware,
  validationDeleteTeamMiddleware,
} from './app/middlewares/validateTeam';

import { validationStoreChampionshipMiddleware } from './app/middlewares/validateChampionship';

import {
  validationUpdateGamesMiddleware,
  validationGetGamesByChampionshipMiddleware,
} from './app/middlewares/validateGames';

import { validationGetRankingMiddleware } from './app/middlewares/validateRanking';

const routes = new Router();

// #region

/**
 * @api {post} /login Login
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "email": "joao@gmail.com",
 *      "password": "senhaProvisoria"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *                "id": 1,
 *                "name": "Joao",
 *                "email": "Joao@gmail.com",
 *              },
 *      "token": "awdiojawdoiisjvelisecaldwjljiafkamiolclc",
 *    }
 */

// #endregion

routes.post(
  '/api/login',
  validationStoreSessionMiddleware,
  SessionController.store
);

// #region

/**
 * @api {post} /newUser Novo usuário
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *       "name": "Joao",
 *       "email": "Joao@gmail.com",
 *       "password": "senhaProvisoria"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Joao",
 *      "email": "Joao@gmail.com",
 *    }
 */

// #endregion

routes.post(
  '/api/newUser',
  validationStoreUserMiddleware,
  UserController.store
);

routes.use(authMiddleware);

// #region

/**
 * @api {put} /updateUser Atualização de usuário
 * @apiGroup User
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiDescription Os Parametros de password são opcionais, envie somente caso queira alterar a senha
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "name": "Joao Souza",
 *      "email": "JoaoSouza@gmail.com",
 *      "oldPassword": "senhaProvisoria",
 *      "password": "novaSenhaProvisoria",
 *      "confirmPassword": "novaSenhaProvisoria"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Joao",
 *      "email": "JoaoNovoEmail@gmail.com",
 *    }
 */

// #endregion

routes.put(
  '/api/updateUser',
  validationUpdateUserMiddleware,
  UserController.update
);

// #region

/**
 * @api {post} /newTeam Cria novo time
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *     "teams": [
 *       {
 *         "name": "Flamengo"
 *       },
 *       {
 *         "name": "Sao Paulo"
 *       }
 *     ]
 *   }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess create new record",
 *      "result": [
 *                  {
 *                    "id": 2,
 *                    "name": "Flamengo",
 *                    "user_id": 1,
 *                    "updatedAt": "2019-12-02T13:37:17.205Z",
 *                    "createdAt": "2019-12-02T13:37:17.205Z"
 *                  },
 *                  {
 *                    "id": 1,
 *                    "name": "Sao Paulo",
 *                    "user_id": 1,
 *                    "updatedAt": "2019-12-02T13:37:17.204Z",
 *                    "createdAt": "2019-12-02T13:37:17.204Z"
 *                  }
 *                ]
 *     }
 */

// #endregion

routes.post(
  '/api/newTeam',
  validationStoreTeamMiddleware,
  TeamController.store
);

// #region

/**
 * @api {get} /getAllTeams Busca times criados pelo usuário
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to find teams",
 *      "teams": [
 *                  {
 *                    "id": 2,
 *                    "name": "Flamengo",
 *                    "user_id": 1,
 *                    "updatedAt": "2019-12-02T13:37:17.205Z",
 *                    "createdAt": "2019-12-02T13:37:17.205Z"
 *                  },
 *                  {
 *                    "id": 1,
 *                    "name": "Sao Paulo",
 *                    "user_id": 1,
 *                    "updatedAt": "2019-12-02T13:37:17.204Z",
 *                    "createdAt": "2019-12-02T13:37:17.204Z"
 *                  }
 *                ]
 *     }
 */

// #endregion

routes.get('/api/getAllTeams', TeamController.index);

// #region

/**
 * @api {get} /getTeamByName Busca time por nome
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParam {String} name Query param
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to find team",
 *      "team": {
 *                   "id": 1,
 *                   "name": "Sao Paulo",
 *                   "user_id": 1,
 *                   "updatedAt": "2019-12-02T13:37:17.204Z",
 *                   "createdAt": "2019-12-02T13:37:17.204Z"
 *              }
 *    }
 */

// #endregion

routes.get(
  '/api/getTeamByName',
  validationGetTeamByNameMiddleware,
  TeamController.indexByName
);

// #region

/**
 * @api {put} /updateTeam Atualiza nome do time
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *     "id": 1,
 *     "newName": "Tricolor"
 *  }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to update team",
 *      "team": {
 *                   "id": 1,
 *                   "name": "Tricolor",
 *                   "user_id": 1,
 *                   "updatedAt": "2019-12-02T14:07:25.544Z",
 *                   "createdAt": "2019-12-02T13:37:17.204Z"
 *              }
 *    }
 */

// #endregion

routes.put(
  '/api/updateTeam',
  validationUpdateTeamMiddleware,
  TeamController.update
);

// #region

/**
 * @api {delete} /deleteTeam Deleta o time por ID
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *     "id": 1,
 *  }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to delete team",
 *    }
 */

// #endregion

routes.delete(
  '/api/deleteTeam',
  validationDeleteTeamMiddleware,
  TeamController.delete
);

// #region

/**
 * @api {post} /newChampionship Create a championship
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "title": "Campeonato Brasileiro",
 *      "teams": [1,2,3,4]
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to create championship",
 *      "championship": {
 *           "id": 5,
 *           "title": "Campeonato Brasileiro",
 *           "user_id": 1,
 *           "updatedAt": "2019-12-02T17:14:49.772Z",
 *           "createdAt": "2019-12-02T17:14:49.772Z",
 *           "complete": false
 *       },
 *       "games": [
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 2
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 3
 *           }
 *       ],
 *       "rankings": [
 *           {
 *               "team_id": 3,
 *               "championship_id": 5,
 *               "position": 1
 *           },
 *          {
 *               "team_id": 1,
 *               "championship_id": 5,
 *               "position": 2
 *           }
 *       ]
 *     }
 */

// #endregion

routes.post(
  '/api/newChampionship',
  validationStoreChampionshipMiddleware,
  ChampionshipController.store
);

// #region

/**
 * @api {get} /getAllChampionships Busca todos o campeonatos
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Sucess to find championships",
 *       "championships": [
 *         {
 *           "id": 5,
 *           "title": "Campeonato Brasileiro",
 *           "complete": false,
 *           "createdAt": "2019-12-02T17:14:49.772Z",
 *           "updatedAt": "2019-12-02T17:14:49.772Z",
 *           "user_id": 1
 *         }
 *       ]
 *     }
 */

// #endregion

routes.get('/api/getAllChampionships', ChampionshipController.index);

// #region

/**
 * @api {get} /getAllGames Busca jogos pelo id do campeonato
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParam {String} championshipId Query param
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *       "games": [
 *           {
 *               "id": 37,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.834Z",
 *               "updatedAt": "2019-12-02T17:14:49.834Z",
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 2,
 *               "first_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               },
 *               "second_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               }
 *           },
 *           {
 *               "id": 38,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.835Z",
 *               "updatedAt": "2019-12-02T17:14:49.835Z",
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 3,
 *               "first_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               },
 *               "second_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               }
 *           }
 *       ]
 *     }
 */

// #endregion

routes.get(
  '/api/getAllGames',
  validationGetGamesByChampionshipMiddleware,
  GamesController.index
);

// #region

/**
 * @api {put} /updateGame Atualiza status do jogo e o ranking
 * @apiGroup Championship
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *       "gameId": 37,
 *       "firstTeamGoals": 3,
 *       "secondTeamGoals": 0,
 *       "firstTeamProGoals": 3,
 *       "secondTeamProGoals": 0
 *     }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Sucess to update Game and ranking"
 *    }
 */

// #endregion

routes.put(
  '/api/updateGame',
  validationUpdateGamesMiddleware,
  GamesController.update
);

// #region

/**
 * @api {get} /getRanking Busca ranking por Id do campeonato
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParam {String} championshipId Query param
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Sucess to find ranking",
 *       "ranking": [
 *         {
 *            "id": 2,
 *            "victories": 9,
 *            "position": 1,
 *            "points": 3,
 *            "goals": 3,
 *            "pro_goals": 3,
 *            "createdAt": "2019-12-02T17:14:53.342Z",
 *            "updatedAt": "2019-12-03T12:40:58.584Z",
 *            "championship_id": 5,
 *            "team_id": 1,
 *            "team": {
 *              "name": "Flamengo",
 *              "id": 1
 *            }
 *         },
 *         {
 *            "id": 4,
 *            "victories": 0,
 *            "position": 2,
 *            "points": 0,
 *            "goals": 0,
 *            "pro_goals": 0,
 *            "createdAt": "2019-12-02T17:14:53.343Z",
 *            "updatedAt": "2019-12-03T12:40:58.586Z",
 *            "championship_id": 5,
 *            "team_id": 2,
 *            "team": {
 *              "name": "Sao Paulo",
 *              "id": 2
 *            }
 *         }
 *       ]
 *     }
 */

// #endregion

routes.get(
  '/api/getRanking',
  validationGetRankingMiddleware,
  RankingController.index
);

export default routes;
