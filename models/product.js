var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    image: {type: String},
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe',
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory',}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);