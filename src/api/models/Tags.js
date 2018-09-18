module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    post: {
      collection: 'Post',
      via: 'tag'
    }
  }
}