var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
   menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    },

    qty: {  type: String , max: 100 },

   cartId: {     
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Cart',
    },
    
    addOn: {    type: String, max: 100  }
    
});


// Export the model
module.exports = mongoose.model('CartItem', CartItemSchema);