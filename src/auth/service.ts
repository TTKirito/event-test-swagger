import { BadRequestError } from "../errors/bad-request-error"
import { Request,Response } from 'express'
import { User } from "../models/User"
import jwt from 'jsonwebtoken'
import { Password } from '../services/password'

export default class AuthService {
    async signUp(req: Request, res: Response) {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })

        if(existingUser){
            throw new BadRequestError('Email in use')
        }

        const user = User.build({
            email,
            password
        })

        await user.save()

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }
    
        res.status(201).send({ user , token: userJwt })
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body
        const existingUser = await User.findOne({email})

        if(!existingUser){
            throw new BadRequestError('Invalid creditian')
        }

        const isMatch = await Password.comparePassword(existingUser.password, password)

        if(!isMatch){
            throw new BadRequestError('Invalid creditian')
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },process.env.JWT_KEY!)
    
        req.session = {
            jwt: userJwt
        }

        res.send({ existingUser, token: userJwt })
    }
}