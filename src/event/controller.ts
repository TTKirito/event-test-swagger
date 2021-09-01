import EventService from "./service";
import { Request,Response } from 'express'

export default class EventController {
    service: EventService;
    constructor() {
        this.service = new EventService();
    }

    async getMany(req: Request, res: Response) {
        await this.service.getMany(req, res);
    }

    async createOne(req: Request, res: Response) {
        await this.service.createOne(req, res);
    }

    async getOne(req: Request, res: Response) {
        await this.service.getOne(req, res);
    }

    async deleteOne(req: Request, res: Response) {
        await this.service.deleteOne(req, res);
    }

    async updateOne(req: Request, res: Response) {
        await this.service.updateOne(req, res);
    }
}