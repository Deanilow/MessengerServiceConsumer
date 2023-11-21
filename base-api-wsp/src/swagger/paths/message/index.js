module.exports = {
  'list-messages': {
    parameters: [
      {
        name: 'to',
        in: 'query',
        required: false,
        description: 'Optional: to to get his message docs',
        type: 'string',
      },
      {
        name: 'from',
        in: 'query',
        required: false,
        description: 'Optional: from to get his message docs',
        type: 'string',
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        description: 'Limit for pagination',
        type: 'integer',
      },
      {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Page for pagination',
        type: 'integer',
      },
    ],
    get: {
      tags: [
        'Messages',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get list of messages based on query params otherwise gets all Messages docs that user added',
      responses: {
        200: {
          description: 'List of Messages found',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/Message',
                },
              },
              pagination: {
                type: 'object',
                $ref: '#/definitions/Pagination',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        401: {
          $ref: '#/components/responses/401',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
  'post-messages': {
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Body for creating new Message',
        schema: {
          type: 'object',
          required: [
            'to',
            'from',
          ],
          properties: {
            to: {
              type: 'string',
            },
            from: {
              type: 'string',
            },
          },
        },
      },
    ],
    post: {
      tags: [
        'Messages',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Create new message mannualy',
      responses: {
        200: {
          description: 'Message created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Message',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        401: {
          $ref: '#/components/responses/401',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
};
