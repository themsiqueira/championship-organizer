import request from 'supertest';
import app from '../../src/app';

describe('Games', () => {
  it('should be able to update game', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Renato',
        email: 'Renato@gmail.com',
        password: 'senhaProvisoria',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Renato@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const createdTeams = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Caragua',
          },
          {
            name: 'Liverpool',
          },
          {
            name: 'Barcelona',
          },
          {
            name: 'Real Madrid',
          },
        ],
      })
      .expect(200);

    const teams = [];

    createdTeams.body.result.forEach(team => {
      teams.push(team.id);
    });

    const createdChampionship = await request(app)
      .post('/api/newChampionship')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        title: 'Campeonato Brasileiro 2050',
        teams,
      })
      .expect(200);

    const { games } = createdChampionship.body;
    const gameId = games[0].championship_id;
    const firstTeamGoals = 3;
    const secondTeamGoals = 0;
    const firstTeamProGoals = 3;
    const secondTeamProGoals = 0;

    const response = await request(app)
      .put('/api/updateGame')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        gameId,
        firstTeamGoals,
        secondTeamGoals,
        firstTeamProGoals,
        secondTeamProGoals,
      })
      .expect(200);

    expect(response.body).toEqual({
      message: 'Sucess to update Game and ranking',
    });
  });
});
