
const app = require('../server/server')
const supertest = require('supertest')
const request = supertest(app)
const { testSetup } = require('./setup')


testSetup('test_user')

it('Endpoint: /api/v1/user/signup', async (done) => {
  const res = await request.post('/api/v1/user/signup').send({
    username: 'Teste',
    email: 'test@test.com',
    password: '123456'
  })
  expect(res.status).toBe(201)
  expect(res.body.data.username).toBeTruthy()
  expect(res.body.data.email).toBeTruthy()
  done()
})
