import type { Request, Response } from 'express';

import authService from '../services/auth.service.js';
import type { RegisterDto } from '../schemas/auth.schema.js';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const user = await authService.register(req.body as RegisterDto);

    res.status(201).json(user);
  }
}

export default new AuthController();
