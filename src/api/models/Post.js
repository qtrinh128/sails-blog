module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
		},
		content: {
			type: 'string',
			required: true,
			columnType: 'longtext'
		},
    image: {
      type: 'string',
      required: true
    },
    tag: {
      type: 'string',
      required: true
    }
  }
}