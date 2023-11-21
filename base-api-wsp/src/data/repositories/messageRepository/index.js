// DATA LAYER
// postRepository:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.

// const errors = require('../../../common/errors');
const mapper = require('../../mapper');
const MessageDomainModel = require('../../../domain/message/model');

const DEFAULT_PAGINATION_CONTENT = {
  pagination: {},
  data: [],
};

const handleUsersPaginationResponse = (response) => {
  if (!response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList = {
    data: response.docs.map((doc) => mapper.toDomainModel(doc, MessageDomainModel)),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return postsList;
};

const getPaginationOptions = (options) => ({
  lean: true,
  page: options.page || 1,
  limit: options.limit || 25,
  sort: { created: -1 },
});

const getQueryObject = (options) => {
  const queries = {
    // to: options.to,
    // from: options.from,
  };
  if (options.to) {
    queries.to = {
      $regex: new RegExp(options.to),
      $options: 'i',
    };
  }

  if (options.from) {
    queries.from = {
      $regex: new RegExp(options.from),
      $options: 'i',
    };
  }

  return queries;
};

const messageStore = {
  async listMessage(options) {
    const { Message: MessageSchema } = this.getSchemas();
    const docs = await MessageSchema.paginate(getQueryObject(options), getPaginationOptions(options));
    return handleUsersPaginationResponse(docs);
  },
  async createMessage(options) {
    const { Message: MessageSchema } = this.getSchemas();
    const newMessage = new MessageSchema({
      to: options.to,
      from: options.from,
      clientIpAddress: options.clientIpAddress,
      createdBy: options.createdBy,
    });
    const doc = await newMessage.save();
    return mapper.toDomainModel(doc, MessageDomainModel);
  },
};

module.exports.init = ({ Message }) => Object.assign(Object.create(messageStore), {
  getSchemas() {
    return {
      Message,
    };
  },
});
