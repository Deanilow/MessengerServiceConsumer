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
const messageDetailDomainModel = require('../../../domain/messageDetail/model');

const DEFAULT_PAGINATION_CONTENT = {
  pagination: {},
  data: [],
};

const handleUsersPaginationResponse = (response) => {
  if (!response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList = {
    data: response.docs.map((doc) => mapper.toDomainModel(doc, messageDetailDomainModel)),
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
    messageId: options.messageId,
  };

  if (options.status) {
    queries.status = {
      $regex: new RegExp(options.status),
      $options: 'i',
    };
  }
  return queries;
};

const messageDetailStore = {
  async listMessageDetail(options) {
    const { MessageDetail: MessageDetailSchema } = this.getSchemas();
    const docs = await MessageDetailSchema.paginate(getQueryObject(options), getPaginationOptions(options));
    return handleUsersPaginationResponse(docs);
  },

  async createMessageDetail(options) {
    const { MessageDetail: MessageDetailSchema } = this.getSchemas();
    const newmessageDetail = new MessageDetailSchema({
      messageId: options.messageId,
      fileUrl: options.fileUrl,
      text: options.text,
      order: options.order,
      clientIpAddress: options.clientIpAddress,
      createdBy: options.createdBy,
    });
    await newmessageDetail.save();
  },

  async getMessageDetailByMessageId(options) {
    const { MessageDetail: MessageDetailSchema } = this.getSchemas();
    const messageDetail = await MessageDetailSchema.find({ messageId: options.messageId }).lean().exec();
    const messageDetailMapper = messageDetail.map((messageDetailMap) => mapper.toDomainModel(messageDetailMap, messageDetailDomainModel));
    return messageDetailMapper;
  },

  async updateStatusMessageDetail(options) {
    const { Message: MessageSchema } = this.getSchemas();
    await MessageSchema.findOneAndUpdate(
      { _id: options.id },
      options,
      { new: true },
    );
  },
};

module.exports.init = ({ MessageDetail }) => Object.assign(Object.create(messageDetailStore), {
  getSchemas() {
    return {
      MessageDetail,
    };
  },
});
