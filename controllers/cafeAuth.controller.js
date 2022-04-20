const jwt = require('jsonwebtoken');
const config = require('../config/database');
const CafeUsers = require('../models/cafeUsers');
const { generatePassword } = require('../util/password');





exports.login = (req, res) => {
    var { email, password } = req.body;

    CafeUsers.findOne({ email: email }, (err, cafeUser) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Error in finding cafeUser'
            });
        }
        if (!cafeUser) {
            return res.status(401).send({
                success: false,
                message: 'No cafeUser found with this email'
            });
        }
        cafeUser.comparePassword(password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in comparing password'
                });
            }
            if (!isMatch) {
                return res.status(401).send({
                    success: false,
                    message: 'Wrong password'
                });
            }
            var token = jwt.sign({
                id: cafeUser._id,
                name: cafeUser.name,
                email: cafeUser.email,
                role: cafeUser.role,
                cafeId:cafeUser.cafeId
                
            }, config.secret, {
                expiresIn: '30d'
            });
            return res.status(200).send({
                success: true,
                message: 'Login successful',
                token: token,
                user: cafeUser
            });
        });
    });
}


exports.register = (req, res) =>{
    const {decoded} = req;
    

    if(decoded.role === "cafeadmin"){
        
        var userpassword = generatePassword();
        staffData = {
            ...req.body,
            addedBy: decoded.id,
            cafeId: decoded.cafeId,
            password:userpassword 
        }

        var staff = new CafeUsers(staffData);
        staff.save((err, staff) =>{
            if(err)
            {
                res.send(err);
            }
            res.json(staff);
        })
    }
    else{
        res.send("Not Authorized to Register Staff Members..!");
    }
}




exports.getOneUser  = function(req, res, next) {

    const { decoded } = req;

    if(decoded.role === "cafeadmin" || decoded.role === "waiter")
    {
        CafeUsers.findById(req.params.id, function(err, user){
            if (err) return next(err);
            res.send(user);
        });
    }
    else{
        res.send('You Are Not Authorized to View This Data');
    }
};



exports.updateUser = function (req, res) {
    
    const { decoded } = req;

    if (decoded.role == 'cafeadmin')
    { 
        CafeUsers.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
            if (err) return next(err);
            res.send('Order udpated.');
        });
    }
    else {
        res.send('You are not authorized to add products!');
    }   
};



exports.getAllUsers = (req, res) =>{

    const { decoded } = req;
    console.log(decoded);

    if(decoded.role === "cafeadmin"){

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


exports.deleteUser = function (req, res){

    const { decoded } = req;

    if(decoded.role === "cafeadmin")
    {
        CafeUsers.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    }
    else {
        res.send('You are not authorized to delete this data');
    }
};