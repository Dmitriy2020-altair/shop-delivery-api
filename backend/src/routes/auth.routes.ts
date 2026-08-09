import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { RegisterSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateBody(RegisterSchema), authController.register);

export default router;
