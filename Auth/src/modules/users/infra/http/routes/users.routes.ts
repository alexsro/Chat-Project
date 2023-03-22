import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  usersController.list
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  usersController.create
);

usersRouter.put(
  '/:id?',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.ref('old_password')
    },
  }),
  ensureAuthenticated,
  usersController.update
)

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  usersController.delete
)


export default usersRouter;
