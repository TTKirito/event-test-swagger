
  const Response = {
    user: {
        type: 'object',
        properties: {
            email: {type: 'string', example: "thuanton98323@gmail.com"},
            createdAt: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
            updatedAt: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
            id: {type: 'string', example: "612f7baf9390f990f1b1a071"},
        }
    },
    name: {type: 'string', example: "2323"},
    startDate: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
    dueDate: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
    description: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
    createdAt: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
    updatedAt: {type: 'string', example: "2021-09-01T11:20:38.457Z"},
    _id: {type: 'string', example: "612f7baf9390f990f1b1a071"},
  };
  const internalServerError = {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Internal Server Error',
            },
          },
        },
      },
    },
  };
  
  const eventNotFound = {
    description: 'Resource not found',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User with id: "71675fcb655047cdc4955929" not found',
            },
          },
        },
      },
    },
  };
  
  const invalidEventData = {
    description: 'Invalid Data provided',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'The fields field1, field2 and field3 are required',
            },
          },
        },
      },
    },
  };

  const security = [
    {
      bearerAuth: [],
    },
  ];

  const createEventBody = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'ADMIN',
      },
      description: {
        type: 'string',
        example: 'Administrator of the system',
      },
      startDate: {
          type: 'string',
          example: '15151515151515'
      },
      dueDate: {
          type: 'string', 
          example: '15151515151515'
      }
    },
  };

  const createEvent = {
    tags: ['Events'],
    description: 'Create a new role in the system',
    operationId: 'createRole',
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/createEventBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '201': {
        description: 'Event created successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Response,
            },
          },
        },
      },
      '422': invalidEventData,
      '500': internalServerError,
    },
  };
  
  const getEvents = {
    tags: ['Events'],
    description: 'Retrieve all the events',
    operationId: 'getEvents',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'page',
          required: true,
          type: 'integer',
          example: 1,
        },
        {
            name: 'limit',
            in: 'query',
            description: 'limit',
            required: true,
            type: 'integer',
            example: 10,
        },
        {
            name: 'sort',
            in: 'query',
            description: 'sort',
            required: true,
            type: 'string',
            example: '-createdAt',
        },
      ],
    responses: {
      '200': {
        description: 'Events retrieved successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: Response,
              },
            },
          },
        },
      },
      '500': internalServerError,
    },
  };
  
  const updateEvent = {
    tags: ['Events'],
    description: 'Update a events',
    operationId: 'updateEvent',
    security,
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Event ID',
        required: true,
        type: 'string',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/createEventBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '200': {
        description: 'Role retrieved successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Response,
            },
          },
        },
      },
      '404': eventNotFound,
      '422': invalidEventData,
      '500': internalServerError,
    },
  };

  const deleteEvent = {
    tags: ['Events'],
    description: 'delete a events',
    operationId: 'deleteeEvent',
    security,
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Event ID',
        required: true,
        type: 'string',
      },
    ],
    responses: {
      '200': {
        description: 'Role retrieved successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Response,
            },
          },
        },
      },
      '404': eventNotFound,
      '422': invalidEventData,
      '500': internalServerError,
    },
  };

  const getEvent = {
    tags: ['Events'],
    description: 'get a events',
    operationId: 'getEvent',
    security,
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Event ID',
        required: true,
        type: 'string',
      },
    ],
    responses: {
      '200': {
        description: 'Role retrieved successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Response,
            },
          },
        },
      },
      '404': eventNotFound,
      '422': invalidEventData,
      '500': internalServerError,
    },
  };
  
  
  
 
  
  
  export { createEvent, getEvents, createEventBody, updateEvent, deleteEvent, getEvent };