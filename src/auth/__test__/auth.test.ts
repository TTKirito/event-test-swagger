import request from 'supertest'
import {app} from '../../app'

////////////////////////////////sign up ////////////////////////////////////////////////////

it('returns a 400 if invalid email and password', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: 'password'
        })
        .expect(400)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400)
})
it('disallows dupplicate email', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'passwor1d'
        })
        .expect(400)
})

it('get a token if valid input', async ()=>{
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    expect(response.body.token).toBeDefined()
})

////////////////////////////////sign in ////////////////////////////////////////////////////

it('returns a 400 if invalid email and password', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123321'
        })
        .expect(400)
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test1@test.com',
            password: 'password'
        })
        .expect(400)
})

it('get a token if valid input', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200)

    expect(response.body.token).toBeDefined()
})