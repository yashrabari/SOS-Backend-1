var Order = require('../models/order');
var Cart = require('../models/cart');
const decode = require('jsonwebtoken/decode');

exports.createOrder = function(req, res){
    const {decoded} =  req;

    var orderData = {
        ...req.body,
        addedBy: decoded.id,
        cafeId: decoded.cafeId
    }

    if(decoded.role === "waiter")
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

exports.createCart = function(req, res ,next){  
    const {decoded} = req;
    cartData = {
        ...req.body,
        addedBy:decode.id,
        cafeId:decoded.cafeId
    }
    if(decoded.role === "waiter")
    {
        var cart = new Cart(cartData);
        cart.save((err, cart) =>{
                if(err){
                    res.send(err);
                }
                res.send(cart)
        })
    }
    else
    {
        res.send("you are not authorized to  create Cart...!")
    }
}