var Order = require('../models/order');

exports.createOrder = function(req, res){
    const {decoded} =  req;

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
    Order.findById(req.params.id, function(err, order){
        if (err) return next(err);
        res.send(order);
    })
}