import express from 'express';
import { signup , login} from "../Controllers/AuthController.js";

export const auth = express.Router();

auth.post('/signup', signup);
auth.post('/login', login);

