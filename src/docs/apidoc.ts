import { createEvent, getEvents, createEventBody, updateEvent, getEvent, deleteEvent } from './event';
import { createUser, createUserBody, signInBody, signIn} from './user';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'My REST API - Documentation',
    description: 'Description of my API here',
    contact: {
      name: 'Developer name',
      email: 'dev@example.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Server',
    }
  ],
  tags: [
    {
      name: 'Events',
    },
    {
      name: 'Users',
    },
  ],
  paths: {
    '/users/signup': {
      post: createUser,
    },
    '/users/signin': {
        post: signIn
    },
    '/events': {
        post: createEvent,
        get: getEvents,
    },
    '/events/{id}': {
        put: updateEvent,
        delete: deleteEvent,
        get: getEvent,
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      createUserBody,
      signInBody,
      createEventBody,
    },
  },
};

export { apiDocumentation };
