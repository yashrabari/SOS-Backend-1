var Table = require('../models/table');

exports.table_create = function(req , res){

    
    const { decoded } = req;
    var tableData = {
        ...req.body,
        addedBy: decoded.id
    }
    if(decoded.role == "cafeadmin")
    {
        var table = new Table(tableData);
        table.addedBy = decoded.id
        table.save((err, table) => {
            if (err) {
                res.send(err);
            }
            res.json(table);
            // res.send('table Created successfully');
        });
    }
    else {
        res.send('You are not authorized to add tables!');
    }

}



exports.table_details = function (req, res, next) {
    table.findById(req.params.id, function (err, tabel) {
        if (err) return next(err);
        res.send(table);
    })
};


exports.tabel_all = function (req, res) {
    table.find({ }, function (err, tabel) {
        if (err) return next(err);
        res.send(table);
    })
};

exports.table_update = function (req, res) {
    table.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, table) {
        if (err) return next(err);
        res.send('table udpated.');
    });
};

exports.table_delete = function (req, res) {
    table.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};