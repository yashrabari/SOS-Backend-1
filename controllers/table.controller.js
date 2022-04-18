var Table = require('../models/table');

exports.create = function(req , res){

    
    const { decoded } = req;
    var tableData = {
        ...req.body,
        addedBy: decoded.id
    }
    if(decoded.role == "cafeadmin")
    {
        var table = new Table(tableData);
        table.addedBy = decoded.id
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

}
