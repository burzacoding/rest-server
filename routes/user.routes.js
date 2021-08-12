const { Router } = require('express');

const { getUsers, getUserByParamsID, addUser } = require('../controllers/user.controller')

const router = Router();



router.get('/users', getUsers);

router.get('/users/:id', getUserByParamsID);

router.post('/users', addUser);

module.exports = router;
