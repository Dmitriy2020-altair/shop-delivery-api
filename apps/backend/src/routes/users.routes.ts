import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import usersController from '../controllers/users.controller.js';
import { UpdateUserSchema } from '../schemas/user.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';
import { UserRole } from '../types/user.js';

const router = Router();
// static routes
router.get('/', authMiddleware, requireRole(UserRole.ADMIN), usersController.getUsers);
router.get('/me', authMiddleware, usersController.getMe);

// dynamic(parameterized) routes
router.get('/:id', validateId, usersController.getUserById);
router.patch('/:id', validateId, validateBody(UpdateUserSchema), usersController.updateUser);
router.delete('/:id', validateId, usersController.deleteUser);

export default router;
