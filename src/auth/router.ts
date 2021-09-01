import express, { Request,Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import AuthController from "./controller";
const controller =new AuthController();

const router = express.Router()

router.post('/api/users/signup',
[
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage("Password between 4 to 20")
],
validateRequest, async (req: Request, res: Response) => await controller.signUp(req, res))

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must be supply')
],
validateRequest, async (req: Request, res: Response)=> await controller.signIn(req, res))

export { router as authRouter }