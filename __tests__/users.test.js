// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData, getCookie } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let user;
  const testData = getTestData();
  let cookies;

  beforeAll(async () => {
    app = fastify();
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    user = await models.user.query().findOne({ email: testData.users.existing.email });
    cookies = await getCookie(app);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const newUser = await models.user.query().findOne({ email: params.email });
    expect(newUser).toMatchObject(expected);
  });

  it('update', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${user.id}`,
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const editedUser = await models.user.query().findOne({ email: params.email });
    expect(editedUser).toMatchObject(expected);
  });

  it('delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      cookies,
      url: app.reverse('deleteUser', { id: user.id }),
    });

    expect(response.statusCode).toBe(302);
  });

  it('create user with the same email', async () => {
    const params = testData.users.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: { ...params, email: user.email },
      },
    });

    expect(response.statusCode).toBe(200);
    const newUser = await models.user.query().findOne({ email: params.email });
    expect(newUser).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
