const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const config = require('../config/database');
const Onboarder = require('../models/onboarders');
const { sendMail } = require('../util/mailSMTP');
const { generatePassword } = require('../util/password');
const CafeUsers = require('../models/cafeUsers');





exports.adminRegister = (req, res) => {
    const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "superadmin"
    });
    admin.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                _id: result._id,
                name: result.name,
                email: result.email,
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.adminLogin = (req, res) => {
    Admin.findOne({ email: req.body.email }).then(admin => {
        if (!admin) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        admin.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            if (isMatch) {
                const token = jwt.sign({
                    email: admin.email,
                    userId: admin._id,
                    role: 'superadmin'
                }, config.secret,
                    {
                        expiresIn: "30d"
                    });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}




exports.onboarderRegister = async (req, res) => {

    var { name, email, role, phone, address, target, image } = req.body;


    if (req.decoded.role !== 'superadmin') {
        return res.status(401).send({
            success: false,
            message: 'You are not authorized to register an onboarder'
        });
    }

    var password = generatePassword();




    //check request contain form data
    var onboarder = new Onboarder({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: password,
        role: role,
        phone: phone,
        address: address,
        target: target,
        image: image
    });

    //save onboarder
    onboarder.save(async (err) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).send({
                    success: false,
                    message: 'This onboarder already exists'
                });
            }
            return res.status(400).send({
                success: false,
                err: err,
                message: 'Could not save onboarder'
            });
        }
        var response = await sendMail({
            to: email,
            subject: "Welcome to SOS",
            text: 'You have successfully registered in the onboarding portal of Start Of stories',
            html: ` <h1>Welcome to SOS</h1>
                    <br>
                    <br>
                <p>You have successfully registered in the onboarding portal of Start Of stories</p>
                    <br>
                    <br>
                <p>You can access your account using this login details <b>username : ${email}</b> <b>Password : ${password}</b></p>
        `
        });
        return res.status(201).send({
            success: true,
            message: 'Onboarder registered successfully'
        });
    });
};

exports.onboarderLogin = (req, res) => {
    var { email, password } = req.body;

    Onboarder.findOne({ email: email }, (err, onboarder) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Error in finding onboarder'
            });
        }
        if (!onboarder) {
            return res.status(401).send({
                success: false,
                message: 'No onboarder found with this email'
            });
        }
        onboarder.comparePassword(password, (err, isMatch) => {
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
                id: onboarder._id,
                name: onboarder.name,
                email: onboarder.email,
                role: onboarder.role
            }, config.secret, {
                expiresIn: '30d'
            });
            return res.status(200).send({
                success: true,
                message: 'Login successful',
                jwt: token,
                user: onboarder
            });
        });
    });
}


exports.cafeuserLogin = (req, res) => {
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
                cafeId:cafeUser.cafeId,
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