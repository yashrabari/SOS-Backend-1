var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
   menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    },

    qty: {  type: String , max: 100 },

    addOn: {    type: String, max: 100  },

   cartId: {     
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Cart',
    },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe'
    }
    
});


// Export the model
module.exports = mongoose.model('CartItem', CartItemSchema);