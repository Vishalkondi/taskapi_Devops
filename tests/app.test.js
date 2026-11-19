const request = require('supertest');
const app = require('../src/app');

describe('TaskAPI', () => {
  test('GET / returns app info', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('TaskAPI');
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Learn Docker' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Learn Docker');
    expect(res.body.done).toBe(false);
  });

  test('POST /tasks without title returns 400', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
  });

  test('POST /tasks with blank title returns 400', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /tasks/:id updates, DELETE removes', async () => {
    const created = await request(app).post('/tasks').send({ title: 'Write CI' });
    const id = created.body.id;
    const upd = await request(app).put(`/tasks/${id}`).send({ done: true });
    expect(upd.body.done).toBe(true);
    const del = await request(app).delete(`/tasks/${id}`);
    expect(del.statusCode).toBe(204);
    const again = await request(app).delete(`/tasks/${id}`);
    expect(again.statusCode).toBe(404);
  });
});