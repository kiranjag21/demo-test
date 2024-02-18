var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    body: {
        type: Boolean,
        default: ''
    }
});

module.exports = mongoose.model('User', UserSchema);