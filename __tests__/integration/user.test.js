import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/api/newUser')
      .send({
        name: 'Joao',
        email: 'Joao@gmail.com',
        password: 'senhaProvisoria',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not create duplicate register', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Mateus',
        email: 'mateus@gmail.com',
        password: 'senhaProvisoria',
      });

    const response = await request(app)
      .post('/api/newUser')
      .send({
        name: 'Mateus',
        email: 'Mateus@gmail.com',
        password: 'senhaProvisoria',
      });

    expect(response.body).toHaveProperty('error');
  });

  it('should not update a email if this is alreandy in use', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Joao@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        name: 'Joao',
        email: 'Mateus@gmail.com',
      })
      .expect(400);

    expect(response.body).toEqual({ error: 'E-mail alreandy exists' });
  });

  it('should not update if wrong password was send', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Mateus@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        name: 'Mateus',
        email: 'Mateus@gmail.com',
        oldPassword: 'senhaProvisoria@2019',
        password: 'senhaDefinitiva',
        confirmPassword: 'senhaDefinitiva',
      })
      .expect(401);

    expect(response.body).toEqual({ error: 'Password does not match' });
  });

  it('should update', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'Joao@gmail.com',
        password: 'senhaProvisoria',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updateUser')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .send({
        name: 'Joao Souza',
        email: 'JoaoSouza@gmail.com',
      })
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });
});
