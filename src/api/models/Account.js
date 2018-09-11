module.exports = {
    attributes: {
        name: {type: 'string', required: true},
        email: {type: 'string', required: true},
        password: {type: 'string' , required: true},
        isAdmin: {type: 'boolean', defaultsTo: true},
        isActive: {type: 'boolean', defaultsTo: true},
        avatar: {type: 'string', defaultsTo: 'avatar.jpg'}
    }
}