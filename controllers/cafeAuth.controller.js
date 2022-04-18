const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const config = require('../config/database');
const CafeUsers = require('../models/cafeUsers');



exports.register = (req, res) =>{
}

exports.getAllUsers = (req, res) =>{

    const { decoded } = req;
    console.log(decoded);

    if(decoded.role === "superadmin"){

        CafeUsers.find({} , (err, cafeUsers) =>{

            if (err) {
                res.send(err);
            }
            res.json(cafeUsers);
        });
    }
    else {
        res.send('You are not authorized to view this data');
    }
};