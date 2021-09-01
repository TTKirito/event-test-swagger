import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'


it('returns 400 if invalid input', async () => {
    const token = await global.signUp()
    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(400)  
    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            description: "hahaha"
        })
        .expect(400) 
    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            startDate: "111579998",
            dueDate: "111579998",
        })
        .expect(400) 

})

it('returns 401 if not authorized', async () => {
    await request(app)
        .post('/api/events')
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(401)  
})

it('returns 201 if valid input', async () => {
    const token = await global.signUp()

    const response = await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201)  
})


////////////////////////get alll



it('fetch all events', async ()=>{
    const token = await global.signUp()


    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201)  
    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201) 
    await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201) 


    const response = await request(app) 
            .get('/api/events')
            .set('Authorization', 'Bearer ' + token)
            .send({})
            .expect(200) 
    expect(response.body.data.length).toEqual(3)
})


//////////////////////////// update
it('returns a 404 if invalid eventId', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString()
    console.log(id)
    const token = await global.signUp()
    await request(app)
        .put(`/api/events/${id}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            dueDate: "111579998",
            description: "hahaha",
            startDate: "111579998",
        })
        .expect(404)  
})

it('return 401 if not authorized', async () => {
    const token = await global.signUp()

    const response = await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201)  
    await request(app)
        .put(`/api/events/${response.body.id}`)
        .send({
            name: "thuan",
            dueDate: "111579998",
            startDate: "111579998",
            description: "hahaha"
        })
        .expect(401)
    
})

it('returns 200 if valid input ', async ()=>{
    const token = await global.signUp()

    const response = await request(app)
        .post('/api/events')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            startDate: "111579998",
            dueDate: "111579998",
            description: "hahaha"
        })
        .expect(201)  
    await request(app)
        .put(`/api/events/${response.body.id}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "thuan",
            dueDate: "111579998",
            startDate: "111579998",
            description: "hahaha"
        })
        .expect(200)
    
})