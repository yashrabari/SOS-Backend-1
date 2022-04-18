// var Product = require('../models/product');
var productCategory = require('../models/productCategory');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.productCategory_create = function (req, res) {
    
    const { decoded } = req;
    var productData = {
        ...req.body,
        cafeId: decoded.id
    }
    if (decoded.role == 'cafeadmin') {
        
            var productCat = new productCategory(productData);
            productCat.addedBy = decoded.id;
            productCat.save((err, productCat) => {
            if (err) {
                res.send(err);
            }
            res.json(productCat);
            // res.send('Product Category Created successfully');
        });
    } 
    else {
        res.send('You are not authorized to add product Category');
    }
};

exports.productCategory_details = function (req, res) {
    productCategory.findById(req.params.id, function (err, productCat) {
        if (err) return next(err);
        res.send(productCat);
    })
};
exports.productCategory_All = function (req, res) {
    productCategory.find({ }, function (err, productCat) {
        if (err) return next(err);
        res.send(productCat);
    })
};


exports.productCategory_details = function (req, res) {
    productCategory.findById(req.params.id, function (err, productCat) {
        if (err) return next(err);
        res.send(productCat);
    })
};

exports.productCategory_update = function (req, res) {
    productCategory.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, productCat) {
        if (err) return next(err);
        res.send('Product Category udpated.');
    });
};

exports.productCategory_delete = function (req, res) {
    productCategory.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};