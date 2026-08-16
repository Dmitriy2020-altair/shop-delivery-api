import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/register', validateBody(RegisterSchema), authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Sign in and set HttpOnly auth cookies
 *     description: >
 *       On success, accessToken and refreshToken are set as HttpOnly cookies.
 *       Token values are not included in the JSON body.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Signed in; Set-Cookie headers include accessToken and refreshToken
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly cookies for accessToken and refreshToken
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/login', validateBody(LoginSchema), authController.login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out and clear auth cookies
 *     description: Revokes the refresh token from the refreshToken cookie when present, then clears cookies.
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Logged out; auth cookies cleared
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: Logged out
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/logout', authController.logout);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Rotate refresh token and issue a new access token
 *     description: >
 *       Reads refreshToken from an HttpOnly cookie, rotates it (with reuse detection),
 *       and sets new accessToken and refreshToken cookies. Token values are not in the JSON body.
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Tokens refreshed; Set-Cookie headers updated
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly cookies for accessToken and refreshToken
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: Token refreshed
 *       '401':
 *         $ref: '#/components/responses/RefreshUnauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/refresh', authController.refresh);

/**
 * @openapi
 * /api/v1/auth/test-cookie:
 *   get:
 *     summary: Debug endpoint — verify accessToken cookie authentication
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Access token cookie is valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticatedResponse'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/test-cookie', authMiddleware, (req, res) => {
  console.log('AUTH USER:', req.user);

  res.json({
    message: 'Authenticated',
    user: req.user,
  });
});

export default router;
