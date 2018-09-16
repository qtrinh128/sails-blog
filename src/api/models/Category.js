module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    posts: {
      collection: 'Post',
      via: 'owner'
    }
  }
}