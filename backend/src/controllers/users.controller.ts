import type { Request, Response } from 'express';

import usersService from '../services/users.service.js';
import { UpdateUserDto } from '../schemas/user.schema.js';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await usersService.getUsers();

    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await usersService.getUserById(res.locals.id);

    res.json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await usersService.updateUser(res.locals.id, req.body as UpdateUserDto);

    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await usersService.deleteUser(res.locals.id);

    res.status(204).send();
  }
}

export default new UserController();
