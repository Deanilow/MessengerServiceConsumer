module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    from: {
      type: 'integer',
    },
    createdBy: {
      type: 'string',
    },
    created: {
      type: 'string',
    },
    arrayBody: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          messageId: {
            type: 'string',
          },
          fileUrl: {
            type: 'string',
          },
          text: {
            type: 'string',
          },
          order: {
            type: 'integer',
          },
        },
      },
    },
  },
};
