import request from 'supertest';
import app from '../../src/app';

describe('Teams', () => {
  it('should be able to create teams', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Jorge',
        email: 'Jorge@gmail.com',
        password: 'senhaProvisoria',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jorge@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Flamengo',
          },
          {
            name: 'Sao Paulo',
          },
          {
            name: 'Corinthians',
          },
          {
            name: 'Santos',
          },
          {
            name: 'Curitiba',
          },
        ],
      })
      .expect(200);

    expect(response.body).toHaveProperty('result');
  });

  it('should not create duplicate team', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jorge@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Flamengo',
          },
        ],
      })
      .expect(200);

    expect(response.body).toHaveProperty('message');
  });

  it('should not update team from another user', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Jesus',
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      });

    const authJesus = await request(app)
      .post('/api/login')
      .send({
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const teamCreated = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${authJesus.body.token}`)
      .send({
        teams: [
          {
            name: 'Parana',
          },
        ],
      })
      .expect(200);

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jorge@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        id: teamCreated.body.result[0].id,
        newName: 'Tricolor',
      })
      .expect(401);

    expect(response.body).toEqual({
      message: 'Permission denied to update this register',
    });
  });

  it('should update team', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const team = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        teams: [
          {
            name: 'Bahia',
          },
        ],
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        id: team.body.result[0].id,
        newName: 'Bahia Atualizado',
      })
      .expect(200);

    expect(response.body).toHaveProperty('team');
  });

  it('should not update if team not exists', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        id: 130,
        newName: 'Parana Atualizado',
      })
      .expect(400);

    expect(response.body).toEqual({ message: 'Team does not exists' });
  });

  it('should not delete team from another user', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Jesus',
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      });

    const authJesus = await request(app)
      .post('/api/login')
      .send({
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const teamCreated = await request(app)
      .post('/api/newTeam')
      .set('Authorization', `Bearer ${authJesus.body.token}`)
      .send({
        teams: [
          {
            name: 'Parana',
          },
        ],
      })
      .expect(200);

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jorge@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .delete('/api/deleteTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        id: teamCreated.body.result[0].id,
      })
      .expect(401);

    expect(response.body).toEqual({
      message: 'Permission denied to delete this register',
    });
  });

  it('should delete team', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Jesus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const team = await request(app)
      .get('/api/getTeamByName')
      .query({ name: 'Parana' })
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send()
      .expect(200);

    const response = await request(app)
      .delete('/api/deleteTeam')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        id: team.body.id,
      })
      .expect(200);

    expect(response.body).toEqual({ message: 'Sucess to delete team' });
  });
});
