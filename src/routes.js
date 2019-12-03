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
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Joao",
 *      "email": "JoaoNovoEmail@gmail.com",
 *    }
 */

routes.put(
  '/api/updateUser',
  validationUpdateUserMiddleware,
  UserController.update
);

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

routes.post('/api/newTeam', TeamController.store);

/**
 * @api {get} /getAllTeams Busca times criados pelo usuário
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Sucess to find teams",
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

routes.get('/api/getAllTeams', TeamController.index);

/**
 * @api {get} /getAllTeams Busca time por nome
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {string} query paraam name=Sao Paulo
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

routes.get('/api/getTeamByName', TeamController.indexByName);

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

routes.put('/api/updateTeam', TeamController.update);

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

routes.delete('/api/deleteTeam', TeamController.delete);

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
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 4
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 1
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 3
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 4
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 1
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 2
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 4
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 4,
 *               "second_team_id": 1
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 4,
 *               "second_team_id": 2
 *           },
 *           {
 *               "championship_id": 5,
 *               "first_team_id": 4,
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
 *           },
 *           {
 *               "team_id": 4,
 *               "championship_id": 5,
 *               "position": 3
 *           },
 *           {
 *               "team_id": 2,
 *               "championship_id": 5,
 *               "position": 4
 *           }
 *       ]
 *     }
 */

routes.post('/api/newChampionship', ChampionshipController.store);

/**
 * @api {get} /getAllChampionships Busca todos o campeonatos
 * @apiGroup Teams
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

routes.get('/api/getAllChampionships', ChampionshipController.index);

/**
 * @api {get} /getAllGames Busca jogos pelo id do campeonato
 * @apiGroup Championship
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {string} query param championshipId=5
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
 *           },
 *           {
 *               "id": 39,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.835Z",
 *               "updatedAt": "2019-12-02T17:14:49.835Z",
 *               "championship_id": 5,
 *               "first_team_id": 1,
 *               "second_team_id": 4,
 *               "first_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               },
 *               "second_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               }
 *           },
 *           {
 *               "id": 40,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.837Z",
 *               "updatedAt": "2019-12-02T17:14:49.837Z",
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 1,
 *               "first_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               },
 *               "second_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               }
 *           },
 *           {
 *               "id": 41,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.838Z",
 *               "updatedAt": "2019-12-02T17:14:49.838Z",
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 3,
 *               "first_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               },
 *               "second_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               }
 *           },
 *           {
 *               "id": 42,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.839Z",
 *               "updatedAt": "2019-12-02T17:14:49.839Z",
 *               "championship_id": 5,
 *               "first_team_id": 2,
 *               "second_team_id": 4,
 *               "first_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               },
 *               "second_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               }
 *           },
 *           {
 *               "id": 43,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.839Z",
 *               "updatedAt": "2019-12-02T17:14:49.839Z",
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 1,
 *               "first_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               },
 *               "second_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               }
 *           },
 *           {
 *               "id": 44,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.840Z",
 *               "updatedAt": "2019-12-02T17:14:49.840Z",
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 2,
 *               "first_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               },
 *               "second_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               }
 *           },
 *           {
 *               "id": 45,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.840Z",
 *               "updatedAt": "2019-12-02T17:14:49.840Z",
 *               "championship_id": 5,
 *               "first_team_id": 3,
 *               "second_team_id": 4,
 *               "first_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               },
 *               "second_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               }
 *           },
 *           {
 *               "id": 46,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.841Z",
 *               "updatedAt": "2019-12-02T17:14:49.841Z",
 *               "championship_id": 5,
 *               "first_team_id": 4,
 *               "second_team_id": 1,
 *               "first_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               },
 *               "second_team": {
 *                   "name": "Flamengo",
 *                   "id": 1
 *               }
 *           },
 *           {
 *               "id": 47,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.842Z",
 *               "updatedAt": "2019-12-02T17:14:49.842Z",
 *               "championship_id": 5,
 *               "first_team_id": 4,
 *               "second_team_id": 2,
 *               "first_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               },
 *               "second_team": {
 *                   "name": "Sao Paulo",
 *                   "id": 2
 *               }
 *           },
 *           {
 *               "id": 48,
 *               "first_team_goals": 0,
 *               "second_team_goals": 0,
 *               "complete": false,
 *               "createdAt": "2019-12-02T17:14:49.842Z",
 *               "updatedAt": "2019-12-02T17:14:49.842Z",
 *               "championship_id": 5,
 *               "first_team_id": 4,
 *               "second_team_id": 3,
 *               "first_team": {
 *                   "name": "Santos",
 *                   "id": 4
 *               },
 *               "second_team": {
 *                   "name": "Corinthians",
 *                   "id": 3
 *               }
 *           }
 *       ]
 *     }
 */

routes.get('/api/getAllGames', GamesController.index);

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

routes.put('/api/updateGame', GamesController.update);

/**
 * @api {get} /getRaking Busca ranking por Id do campeonato
 * @apiGroup Teams
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {string} query paraam championshipId=5
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
 *         },
 *         {
 *            "id": 1,
 *            "victories": 0,
 *            "position": 4,
 *            "points": 0,
 *            "goals": 0,
 *            "pro_goals": 0,
 *            "createdAt": "2019-12-02T17:14:53.339Z",
 *            "updatedAt": "2019-12-03T12:40:58.587Z",
 *            "championship_id": 5,
 *            "team_id": 3,
 *            "team": {
 *               "name": "Corinthians",
 *               "id": 3
 *            }
 *         },
 *         {
 *           "id": 3,
 *           "victories": 0,
 *           "position": 3,
 *           "points": 0,
 *           "goals": 0,
 *           "pro_goals": 0,
 *           "createdAt": "2019-12-02T17:14:53.342Z",
 *           "updatedAt": "2019-12-03T12:40:58.586Z",
 *           "championship_id": 5,
 *           "team_id": 4,
 *           "team": {
 *             "name": "Santos",
 *             "id": 4
 *           }
 *         }
 *       ]
 *     }
 */

routes.get('/api/getRanking', RankingController.index);

export default routes;
