const express = require('express');
const ProductController = require('../controllers/pets')

const router = express.Router()

const verifyToken = require('../middlewears/verifyToken')

router.post('/', ProductController.create);
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)
router.get('/all', ProductController.getAll)

router.get('/:id', ProductController.getById)
router.get('/search/:search', ProductController.search)

module.exports = router;
