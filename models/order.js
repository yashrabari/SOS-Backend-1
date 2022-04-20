var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe',
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    },
    cartId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    orderType: {
        type: String,
        max:100,
        required: true
    },
    orderStatus: {  type: Boolean, default: false   },
    sos: {  type: Boolean, default: false   },
    feedback: { type: String, max: 100}
},
{
    timestamps:true
});


// Export the model
module.exports = mongoose.model('Order',OrderSchema);

