import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import usersController from '../controllers/users.controller.js';
import { UpdateUserSchema } from '../schemas/user.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';
import { UserRole } from '../types/user.js';

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: List all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', authMiddleware, requireRole(UserRole.ADMIN), usersController.getUsers);

/**
 * @openapi
 * /api/v1/users/me:
 *   get:
 *     summary: Get the authenticated user profile
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserMe'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/me', authMiddleware, usersController.getMe);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   patch:
 *     summary: Update a user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       '200':
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid id, empty body, or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorMessage'
 *                 - $ref: '#/components/schemas/ValidationError'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     summary: Delete a user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           exclusiveMinimum: 0
 *     responses:
 *       '204':
 *         description: User deleted
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validateId, usersController.getUserById);
router.patch('/:id', validateId, validateBody(UpdateUserSchema), usersController.updateUser);
router.delete('/:id', validateId, usersController.deleteUser);

export default router;
