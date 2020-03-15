const mongoose = require('mongoose');
/*var uniqueValidator = require('mongoose-unique-validator')*/
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        /*unique: true,*/
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    hash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        /*unique: true,*/
        required: [true, "can't be blank"],
        /*match: [/\S+@\S+\.\S+/, 'is invalid'],*/
        index: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: 'user'
    },
})

/*schema.plugin(uniqueValidator, {message: 'is already taken'})*/   /* Remove the commentaries related to
                                                                    it ( == {unique && var} ) to reimplement unique check here again */
schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', schema)
