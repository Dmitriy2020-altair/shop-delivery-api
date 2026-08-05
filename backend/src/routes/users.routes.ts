import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import usersController from '../controllers/users.controller.js';
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema.js';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', validateBody(CreateUserSchema), usersController.createUser);
router.get('/:id', validateId, usersController.getUserById);
router.patch('/:id', validateId, validateBody(UpdateUserSchema), usersController.updateUser);
router.delete('/:id', validateId, usersController.deleteUser);

export default router;
