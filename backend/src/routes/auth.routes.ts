import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateBody(RegisterSchema), authController.register);
router.post('/login', validateBody(LoginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/test-cookie', authMiddleware, (req, res) => {
  console.log('AUTH USER:', req.user);

  res.json({
    message: 'Authenticated',
    user: req.user,
  });
});
export default router;
