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

export default refreshTokenRouter;