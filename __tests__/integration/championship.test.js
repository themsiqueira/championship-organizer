import request from 'supertest';
import app from '../../src/app';

describe('Championship', () => {
  it('should be able to create a championship', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Luciano',
        email: 'Luciano@gmail.com',
        password: 'senhaProvisoria',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Luciano@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const createdTeams = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Cajuru',
          },
          {
            name: 'Sao Sebastiao',
          },
          {
            name: 'Sao Caetano',
          },
          {
            name: 'Peruibe',
          },
        ],
      })
      .expect(200);

    const teams = [];

    createdTeams.body.result.forEach(team => {
      teams.push(team.id);
    });

    const response = await request(app)
      .post('/api/newChampionship')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        title: 'Campeonato Brasileiro 2019',
        teams,
      })
      .expect(200);

    expect(response.body).toHaveProperty('championship');
  });

  it('should not be able to create a championship with a title that alreandy in use', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Luciano',
        email: 'Luciano@gmail.com',
        password: 'senhaProvisoria',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Luciano@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const createdTeams = await request(app)
      .get('/api/getAllTeams')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .expect(200);

    const teams = [];

    createdTeams.body.teams.forEach(team => {
      teams.push(team.id);
    });

    const response = await request(app)
      .post('/api/newChampionship')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        title: 'Campeonato Brasileiro 2019',
        teams,
      })
      .expect(400);

    expect(response.body).toEqual({ message: 'Championship alreandy exists' });
  });
});
