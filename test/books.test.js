
const app = require('../server/server')
const supertest = require('supertest')
const request = supertest(app)
const { testSetup } = require('./setup')


testSetup('test_books')

let _id = null

it('Endpoint: /api/v1/books', async () => {
  const res = await request.post('/api/v1/books').send({
    title: "Book's title (Teste)",
    author: "Book author  (Teste)"
  })
  _id = res.body.data._id
  expect(res.status).toBe(201)
  expect(res.body.data.title).toBeTruthy()
  expect(res.body.data.author).toBeTruthy()
})

it('Endpoint: /api/v1/books/{id}', async done => {
  const res = await request.get('/api/v1/books/' + _id).send()
  expect(res.status).toBe(200)
  expect(res.body.data.title).toBe("Book's title (Teste)")
  done()
})


