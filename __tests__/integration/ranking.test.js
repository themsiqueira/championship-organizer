import request from 'supertest';
import app from '../../src/app';

describe('Ranking', () => {
  it('should be able to get Ranking', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Gumercindo',
        email: 'Gumercindo@gmail.com',
        password: 'senhaProvisoria',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Gumercindo@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const createdTeams = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Sao Judas',
          },
          {
            name: 'Campinal',
          },
          {
            name: 'Esporte',
          },
          {
            name: 'Bota Fogo',
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
        title: 'Campeonato Brasileiro 2030',
        teams,
      })
      .expect(200);

    const response = await request(app)
      .get('/api/getRanking')
      .query({
        championshipId: createdChampionship.body.championship.id,
      })
      .set('Authorization', `Bearer ${auth.body.token}`)
      .expect(200);

    expect(response.body).toHaveProperty('ranking');
  });
});
