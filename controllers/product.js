var Product = require('../models/product');
var ProductCategory = require('../models/productCategory');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    
    const { decoded } = req;
    var productData = {
        ...req.body,
        addedBy: decoded.id
    }
    if (decoded.role == 'cafeadmin') {
        
            var product = new Product(productData);
            product.addedBy = decoded.id;
            product.save((err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
            res.send('Product Created successfully');
        });
    } 
    else {
        res.send('You are not authorized to add products!');
    }
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};


exports.product_All = function (req, res) {
    Product.find({ }, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};