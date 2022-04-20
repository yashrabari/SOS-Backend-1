var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema  = new Schema({
    name: { type: String, max: 100, required: true},
    contact: { type: String, required: true},
    role: { type: String, default: 'customer'}
}, {
    timestamps: true,
});


// Export the model
module.exports = mongoose.model('NonSosCustomer', CustomerSchema);