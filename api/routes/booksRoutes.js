const router = require('express').Router()
const controller = require('../controllers/booksController')


/* These endpoints do not need authentication to access them */

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getById)
    .put(controller.put)
    .delete(controller.delete)

router.route('/:id/title')
    .get(controller.getTitleById)


module.exports = router