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
            // res.send('Product Created successfully');
        });
    } 
    else {
        res.send('You are not authorized to add products!');
    }
};



exports.product_details = function (req, res, next) {
    const { decoded } = req;

    if (decoded.role == 'cafeadmin' || decoded.role == 'waiter')
    {    
        Product.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            res.send(product);
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }
};



exports.product_All = function (req, res) {
    const { decoded } = req;

    if (decoded.role == 'cafeadmin' || decoded.role == 'waiter' )
    {      
        Product.find({ }, function (err, product) {
            if (err) return next(err);
            res.send(product);
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }
};



exports.product_update = function (req, res) {
    const { decoded } = req;

    if (decoded.role == 'cafeadmin')
    { 
        Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
            if (err) return next(err);
            res.send('Product udpated.');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }   
};



exports.product_delete = function (req, res) {
    const { decoded } = req;

    if (decoded.role == 'cafeadmin')
    {
        Product.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }  
};