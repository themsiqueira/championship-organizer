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
 * @api {get} /getAllChampionships Atualiza nome do time
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

export default routes;
