var Cart = require('../models/cart');
var CartItem = require('../models/cartItem');

// Cart Controllers......!

exports.createCart = function(req, res ,next){  
    const {decoded} = req;
    
    cartData = {
        ...req.body,
        addedBy:decoded.id,
        cafeId:decoded.cafeId
    }
    
    if(decoded.role === "cafeadmin" || decoded.role === "waiter")
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
};



exports.createCartItem = function (req, res){

    const {decoded} = req;
    var cartItems = {
        ...req.body,
        addedBy: decoded.id,
        cafeId: decoded.cafeId
    }

    if(decoded.role === "cafeadmin" || decoded.role === "waiter")
    {
        var cartItem = new CartItem(cartItems);
        cartItem.save((err, cart) =>{
                if(err){
                    res.send(err);
                }
                res.send(cart)
        })
    }
    else
    {
        res.send("You Are Not Authorized to Add Items in Cart...!")
    }
};




exports.upadteCartItem = function (req, res) {
    
    const { decoded } = req;

    if (decoded.role == 'cafeadmin' || decoded.role == 'waiter')
    { 
        CartItem.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, Item) {
            if (err) return next(err);
            res.send('Cart Udpated.');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }   
};
