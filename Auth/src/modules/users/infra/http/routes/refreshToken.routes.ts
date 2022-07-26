import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import RefreshTokenController from "../controllers/RefreshTokenController";

const refreshTokenRouter = Router();
const refreshTokenController = new RefreshTokenController();

refreshTokenRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  refreshTokenController.create
);

refreshTokenRouter.delete(
  '/:refresh_token_id',
  celebrate({
    [Segments.PARAMS]: {
      refresh_token_id: Joi.string().uuid().required(),
    },
  }),
  refreshTokenController.delete
)

export default refreshTokenRouter;