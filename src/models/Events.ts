import mongoose from 'mongoose'
import { UserDoc } from './User'

interface EventAttrs {
    name: string,
    startDate: string,
    dueDate: string,
    description: string,
    user: UserDoc,
}

interface EventDoc extends mongoose.Document{
    name: string,
    startDate: string,
    dueDate: string,
    description: string,
    user: UserDoc,
}

interface EventModel extends mongoose.Model<EventDoc>{
    build(attrs: EventAttrs): EventDoc
}


const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
    },
    dueDate:{
        type: String,
    },
    description:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.password
        }
    },
    timestamps: true,
})


eventSchema.statics.build = (attrs: EventAttrs) => {
    return new Event(attrs)
}



const Event =mongoose.model<EventDoc, EventModel>('Event', eventSchema)
export { Event }