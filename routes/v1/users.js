const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const { registerValidator, loginValidator, userIdParam } = require('../../validators/userValidator');
const auth = require('../../middlewares/auth');

// Public
router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);

// Protected (write routes require JWT)
router.get('/', auth.optional, userController.getAll); // read public but can be protected if desired
router.get('/:id', userIdParam, auth.optional, userController.getById);
router.put('/:id', userIdParam, auth.required, registerValidator, userController.update);
router.patch('/:id', userIdParam, auth.required, userController.update);
router.delete('/:id', userIdParam, auth.required, userController.remove);

module.exports = router;
