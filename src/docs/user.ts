
  
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
  
  const userNotFound = {
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
  
  const invalidUserData = {
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
  
  
  const createUserBody = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'john.snow@email.com',
      },
      password: {
        type: 'string',
        description: "unencrypted user's password",
        example: '!1234aWe1Ro3$#',
      },
    },
  };
  
  const signInBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            example: 'john.snow@email.com',
          },
          password: {
            type: 'string',
            description: "unencrypted user's password",
            example: '!1234aWe1Ro3$#',
          },
    },
  };
  
  const createUser = {
    tags: ['Users'],
    description: 'Create a new user in the system',
    operationId: 'createUser',
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/createUserBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '201': {
        description: 'User created successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '60564fcb544047cdc3844818',
                          },
                          email: {
                            type: 'string',
                            example: 'john.snow@email.com',
                          },
                          createdAt: {
                            type: 'string',
                            example: '2021-03-20T19:40:59.495Z',
                          },
                          updatedAt: {
                            type: 'string',
                            example: '2021-03-20T21:23:10.879Z',
                          },
                    }
                    
                },
                token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmY3OWFkNjk0ZWVlOGU4Yjc4OGFmNSIsImVtYWlsIjoiam9objIuc25vM3dAZW1haWwuY29tIiwiaWF0IjoxNjMwNTAxMjkzfQ.OL9oVVPu-Do5yyj5-UcXcWe0t5p5aITzHg37jNLHpBw'
                }
              },
            },
          },
        },
      },
      '422': invalidUserData,
      '500': internalServerError,
      '404': userNotFound,
    },
  };

  const signIn = {
    tags: ['Users'],
    description: 'Signin',
    operationId: 'siginin',
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/signInBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '201': {
        description: 'User created successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '60564fcb544047cdc3844818',
                          },
                          email: {
                            type: 'string',
                            example: 'john.snow@email.com',
                          },
                          createdAt: {
                            type: 'string',
                            example: '2021-03-20T19:40:59.495Z',
                          },
                          updatedAt: {
                            type: 'string',
                            example: '2021-03-20T21:23:10.879Z',
                          },
                    }
                    
                },
                token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmY3OWFkNjk0ZWVlOGU4Yjc4OGFmNSIsImVtYWlsIjoiam9objIuc25vM3dAZW1haWwuY29tIiwiaWF0IjoxNjMwNTAxMjkzfQ.OL9oVVPu-Do5yyj5-UcXcWe0t5p5aITzHg37jNLHpBw'
                }
              },
            },
          },
        },
      },
      '422': invalidUserData,
      '500': internalServerError,
      '404': userNotFound,
    },
  };
  
  
  export { createUser, createUserBody, signIn, signInBody };