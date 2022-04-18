var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCategorySchema = new Schema({
    name: { type: String, required: true, max: 100 },
    image: {type: String},
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe',
    }
});


// Export the model
module.exports = mongoose.model('ProductCategory', ProductCategorySchema);