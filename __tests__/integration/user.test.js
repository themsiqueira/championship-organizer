import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/api/newUser')
      .send({
        name: 'Nome para teste',
        email: 'nomeparateste@gmail.com',
        password: 'senhateste@2019',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not create duplicate register', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Não deve criar duas vezes',
        email: 'naodevecriarduasvezes@gmail.com',
        password: 'senhateste@2019',
      });

    const response = await request(app)
      .post('/api/newUser')
      .send({
        name: 'Não deve criar duas vezes',
        email: 'naodevecriarduasvezes@gmail.com',
        password: 'senhateste@2019',
      });

    expect(response.body).toHaveProperty('error');
  });

  it('should not update a email if this is alreandy in use', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'nomeparateste@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        name: 'Não deve criar duas vezes',
        email: 'naodevecriarduasvezes@gmail.com',
      })
      .expect(400);

    expect(response.body).toEqual({ error: 'E-mail alreandy exists' });
  });

  it('should not update if wrong password was send', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'nomeparateste@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        name: 'Não deve criar duas vezes',
        email: 'nomeparateste@gmail.com',
        oldPassword: 'senhateste@2018',
        password: 'senhateste@2020',
        confirmPassword: 'senhateste@2020',
      })
      .expect(401);

    expect(response.body).toEqual({ error: 'Password does not match' });
  });

  it('should update', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'nomeparateste@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        name: 'Não deve criar duas vezes atualizado',
        email: 'nomeparatestenovo@gmail.com',
      })
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });
});
