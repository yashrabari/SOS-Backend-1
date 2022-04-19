var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    cafeId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
},{
    timestamps:true
});


// Export the model
module.exports = mongoose.model('Cart', CartSchema);