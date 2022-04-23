var Order = require('../models/order');

exports.createOrder = function(req, res){
    const { decoded } =  req;

    var orderData = {
        ...req.body,
        addedBy: decoded.id,
        cafeId: decoded.cafeId
    }

    if(decoded.role === "cafeadmin" || decoded.role === "waiter")
    {
        var order = new Order(orderData);
        order.save((err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);   
    });
}
    else{
        res.send('You are not authorized to take orders!');
    }
};



exports.viewOrder = function(req, res, next) {

    const { decoded } = req;

    if(decoded.role === "cafeadmin" || decoded.role === "waiter")
    {
        Order.findById(req.params.id, function(err, order){
            if (err) return next(err);
            res.send(order);
        });
    }
    else{
        res.send('You are not authorized to take orders!');
    }
};



exports.updateOrder = function (req, res) {
    
    const { decoded } = req;

    if (decoded.role == 'cafeadmin' || decoded.role == 'waiter')
    { 
        Order.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, order) {
            if (err) return next(err);
            res.send('Order udpated.');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }   
};



exports.deleteOrder = function (req, res) {
    const { decoded } = req;

    if (decoded.role == 'cafeadmin')
    {
        Order.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }  
};




