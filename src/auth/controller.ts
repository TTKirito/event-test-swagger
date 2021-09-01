import AuthService from "./service";
import { Request,Response } from 'express'

export default class AuthController {
    service: AuthService;
    constructor() {
        this.service = new AuthService();
    }

    async signUp(req: Request, res: Response) {
        await this.service.signUp(req, res);
    }

    async signIn(req: Request, res: Response) {
        console.log('hahah')
        await this.service.signIn(req, res);
    }
}