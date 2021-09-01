import { BadRequestError } from "../errors/bad-request-error"
import { Request,Response } from 'express'
import { Event } from "../models/Events"
import { paginate } from "../utils/paginate"
import { User } from "../models/User"
import { NotFoundError } from "../errors/not-found-error"
import { NotAuthorizedError } from "../errors/not-authorized-error"

export default class EventService {
    async getMany(req: Request, res: Response) {
        const { query, pagination } = await paginate(req, Event)
        const data = await query.populate('user')
        res.send({ data, pagination })
    }

    async createOne(req: Request, res: Response) {
        const { name, startDate, dueDate, description } = req.body

        const user = await User.findById(req.currentUser!.id);
        if (!user) {
            throw new BadRequestError('User not found')
        }
        const event = Event.build({
            user,
            name,
            startDate,
            dueDate,
            description,
        })
        await event.save();
        res.status(201).send(event)
    }

    async getOne(req: Request, res: Response) {
        const event = await Event.findById(req.params.id).populate('user')
 
        if(!event){
            throw new NotFoundError()
        }
     
        res.send(event)
    }

    async updateOne(req: Request, res: Response) {
        let event = await Event.findById(req.params.id)

        if(!event){
            throw new NotFoundError()
        }
        if(event.user.toString() !== req.currentUser?.id.toString()){
            throw new NotAuthorizedError()
        }
    
        event = await Event.findByIdAndUpdate(event.id, req.body, { new: true }).populate('user')
        
        res.send(event)
    }

    async deleteOne(req: Request, res: Response) {
        let event = await Event.findByIdAndDelete(req.params.id)
        if(!event){
            throw new NotFoundError()
        }

        if(event.user.toString() !== req.currentUser?.id.toString()){
            throw new NotAuthorizedError()
        }
        event = await Event.findByIdAndDelete(req.params.id)
        res.send(event)
    }
}