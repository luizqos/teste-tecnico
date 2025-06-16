import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    const loginAdmin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin@123',
      })
      .expect(201);

    adminToken = loginAdmin.body.access_token;

    const loginUser = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user@user.com',
        password: 'user@123',
      })
      .expect(201);

    userToken = loginUser.body.access_token;
  });

  it('GET /users → should return list of users for admin', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('POST /users → admin should create a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Created User',
        email: 'created@example.com',
        password: '123456',
        role: 'user',
        status: true,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'created@example.com');
  });

  it('PATCH /users/:id → should update own user data', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/users/2`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'User Updated',
      })
      .expect(200);

    expect(res.body).toHaveProperty('name', 'USER UPDATED');
  });

  it('PATCH /users/:id → should not allow updating another user', async () => {
    await request(app.getHttpServer())
      .patch(`/users/1`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hacker',
      })
      .expect(403);
  });

  it('DELETE /users/:id → should not allow user to delete', async () => {
    await request(app.getHttpServer())
      .delete(`/users/2`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });

  it('DELETE /users/:id → admin should delete user', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/users/2`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
