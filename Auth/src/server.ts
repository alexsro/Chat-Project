import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import { errors } from 'celebrate';
import globalExceptionHandler from './shared/infra/http/middlewares/globalExceptionHandler';
import routes from "./shared/infra/http/routes";

const app = express();

import './shared/container';

app.use(cors())
app.use(express.json());
app.use(routes)
app.use(errors());
app.use(globalExceptionHandler);

app.listen(3334, () => {
  console.log('Authentication API started on port 3334');
})