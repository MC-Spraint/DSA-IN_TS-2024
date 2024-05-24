import { Router } from 'express';
import UsersController from './user.controller';
import passport from 'passport';
import authExtractPayloadMiddleware from '../core/services/auth.extract-payload.middleware';

const usersRouter = Router();


usersRouter.post('/signup', UsersController.signup);
usersRouter.post('/login', UsersController.login);
usersRouter.get('/protected', authExtractPayloadMiddleware,  UsersController.protected);

usersRouter.get('/protectedd', passport.authenticate('jwt', { session: false }),  UsersController.protected);

export default usersRouter;
