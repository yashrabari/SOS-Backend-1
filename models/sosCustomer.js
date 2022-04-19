var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SOSCustomerSchema  = new Schema({
    name: { type: String, max: 100, required: true},
    contact: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, max: 100}
});


// Export the model
module.exports = mongoose.model('Customer', SOSCustomerSchema);