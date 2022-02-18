var express = require('express');
var router = express.Router();


const { index, create, update, remove, getById } = require('../controllers/faixa')


router.get('/', index);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);


module.exports = router;
