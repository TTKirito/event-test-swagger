import express, { Request,Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import { requireAuth } from '../middlewares/require-auth'
import { currentUser } from '../middlewares/current-user'
import EventController from './controller'
const controller = new EventController()

const router = express.Router()

router.post('/api/events',
[
    body('name')
        .not()
        .isEmpty()
        .withMessage("name must be valid"),
    body('startDate')
        .not()
        .isEmpty()
        .withMessage('start date is required'),
    body('dueDate')
        .not()
        .isEmpty()
        .withMessage('due date is required'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('description must be required')
        .optional({ checkFalsy: true }),
],
validateRequest, currentUser, requireAuth, async (req: Request, res: Response)=> await controller.createOne(req, res))

router.get('/api/events', currentUser, requireAuth, async (req: Request, res: Response)=> await controller.getMany(req, res))

router.get('/api/events/:id', currentUser, requireAuth, async (req: Request, res: Response) => await controller.getOne(req, res))

router.put('/api/events/:id',
[
    body('name')
        .not()
        .isEmpty()
        .withMessage("name must be valid"),
    body('startDate')
        .not()
        .isEmpty()
        .withMessage('start date is required'),
    body('dueDate')
        .not()
        .isEmpty()
        .withMessage('due date is required'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('description must be required')
        .optional({ checkFalsy: true }),
],
validateRequest, currentUser, requireAuth, async (req: Request, res: Response)=> await controller.updateOne(req, res))

router.delete('/api/events/:id',currentUser, requireAuth, async (req: Request, res: Response) => await controller.deleteOne(req, res))


export { router as eventRouter }