const messageDetailStore = {
  async updateStatusMessageDetail(options) {
    const { MessageDetail: MessageSchema } = this.getSchemas();
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
