import { Router } from 'express';
import { MatchingController } from '@controllers/matching.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { MatchingServiceDTO } from '@/dtos/matching.dto';

export class MatchingRoute implements Routes {
  public path = '/matching';
  public router = Router();
  public matching = new MatchingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.user.getUsers);
    // this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(MatchingServiceDTO), this.matching.findMatch);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
  }
}
