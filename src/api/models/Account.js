module.exports = {
    attributes: {
        name: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'},
        isAdmin: {type: 'boolean', defaultsTo: true},
        isActive: {type: 'boolean', defaultsTo: true},
        avatar: {type: 'string', defaultsTo: 'avatar.jpg'}
    }
}