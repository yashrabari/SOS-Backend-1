const CafeUsers = require('../models/cafeUsers');
const { generatePassword } = require('../util/password');
const TempCafe = require('../models/tempCafe');
const { createPaymentLink, verifyPaymentLink } = require('../util/createPaymentLink');
const { sendMail } = require('../util/mailSMTP');

exports.getAllTempCafe = (req, res) => {

    const { decoded } = req;
    console.log(decoded);


    if (decoded.role === 'admin') {
        TempCafe.find({}, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            res.json(tempCafe);
        });
    } else if (decoded.role === 'onboarder') {
        TempCafe.find({ addedBy: decoded.id }, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            res.json(tempCafe);
        });
    } else {
        res.send('You are not authorized to view this data');
    }
};


exports.getTempCafeById = (req, res) => {

    const { decoded } = req;
    console.log(decoded);

    if (decoded.role === 'admin') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            res.json(tempCafe);
        });
    } else if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {
                res.json(tempCafe);
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
};


exports.updateTempCafe = (req, res) => {

    const { decoded } = req;
    console.log(decoded);

    if (decoded.role === 'admin') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {
                TempCafe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, tempCafe) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(tempCafe);
                });
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {
                TempCafe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, tempCafe) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(tempCafe);
                });
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
};

exports.deleteTempCafe = (req, res) => {

    const { decoded } = req;
    console.log(decoded);

    if (decoded.role === 'admin') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {
                TempCafe.findByIdAndRemove(req.params.id, (err, tempCafe) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'TempCafe successfully deleted' });
                });
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {
                TempCafe.findByIdAndRemove(req.params.id, (err, tempCafe) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'TempCafe successfully deleted' });
                });
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
};


exports.createTempCafe = (req, res) => {

    const { decoded } = req;
    console.log(req.body);


    var tempCafeData = {
        ...req.body,
        addedBy: decoded.id
    }

    if (decoded.role === 'admin') {
        const tempCafe = new TempCafe(tempCafeData);
        tempCafe.save((err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            res.json(tempCafe);
        });
    } else if (decoded.role === 'onboarder') {
        const tempCafe = new TempCafe(tempCafeData);
        tempCafe.addedBy = decoded.id;
        tempCafe.save((err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            res.json(tempCafe);
        });
    } else {
        res.send('You are not authorized to view this data');
    }
}


exports.generateOTP = (req, res) => {

    const { decoded } = req;
    console.log(decoded);

    var generatedOTP = Math.floor(100000 + Math.random() * 900000)
    if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, async (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {

                if (tempCafe.paymentMod == 'online') {
                    var responseFromPaymentLinkServer = await verifyPaymentLink(tempCafe.paymentLinkId);
                    if (!responseFromPaymentLinkServer.success) {
                        return res.send(responseFromPaymentLinkServer);
                    }
                }

                tempCafe.generatedOTP = generatedOTP;
                tempCafe.save(async (err, tempCafe) => {
                    if (err) {
                        res.send(err);
                    }
                    console.log(tempCafe);


                    var mailRes = await sendMail({
                        to: tempCafe.email,
                        subject: "Welcome to SOS",
                        text: 'OTP for your account is ',
                        html: ` <h1>Welcome to SOS</h1>
                                <br>
                                <br>
                            <p>You have successfully registered all of the steps to be a part of SOS</p>
                                <br>
                                <br>
                            <p>Your OTP for final step is <b>${generatedOTP}<b></p>
                    `
                    });
                    res.json(tempCafe);

                });
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
}

exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    var cafe = await TempCafe.findById(req.params.id)
    if (cafe.generatedOTP !== otp) {
        return res.json({
            message: 'OTP is incorrect',
            status: false

        })
    }

    TempCafe.findByIdAndUpdate(req.params.id, { finalApproved: true }, async (err, tempCafe) => {
        if (err) {
            return res.send(err);
        }


        var mailRes = await sendMail({
            to: tempCafe.email,
            subject: "Welcome to SOS",
            text: 'You vendor account successfully created',
            html: ` <h1>Welcome to SOS</h1>
                    <br>
                    <br>
                <p>You have successfully registered as vendor at Start Of Stories</p>
                    <br>
                    <br>
        `
        });


        var password = generatePassword();
        var cafeUser = new CafeUsers({
            name: tempCafe.contactPerson,
            email: tempCafe.email,
            phone: tempCafe.contactNumber,
            password: password,
            role: 'cafeadmin',
            cafeId: tempCafe._id,
        })

        cafeUser.save(async (err, cafeUser) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.json({
                message: 'OTP is correct',
                status: true
            })
        });



    });

}


exports.generatePaymentLink = async (req, res) => {

    const { decoded } = req;

    if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, async (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {

                var paymentLinkId = (req.params.id + (Math.floor(100000 + Math.random() * 900000))).toString();
                var paymentData = {
                    customerName: tempCafe.name,
                    customerEmail: tempCafe.email,
                    customerPhone: tempCafe.contactNumber,
                    paymentLinkId: paymentLinkId,
                    paymentAmount: tempCafe.paymentAmount,
                }
                var responseFromPaymentLinkServer = await createPaymentLink(paymentData);

                if (responseFromPaymentLinkServer.success) {
                    tempCafe.paymentLinkId = paymentLinkId;
                    tempCafe.paymentLink = responseFromPaymentLinkServer.data.link_url;
                    tempCafe.save(async (err, tempCafe) => {
                        if (err) {
                            res.send(err);
                        }
                        res.json(tempCafe);
                    });
                } else {
                    res.json(responseFromPaymentLinkServer)
                }
            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
}


exports.verifyPayment = async (req, res) => {

    const { decoded } = req;


    if (decoded.role === 'onboarder') {
        TempCafe.findById(req.params.id, async (err, tempCafe) => {
            if (err) {
                res.send(err);
            }
            if (tempCafe.addedBy.toString() === decoded.id) {


                var responseFromPaymentLinkServer = await verifyPaymentLink(tempCafe.paymentLinkId);

                res.json(responseFromPaymentLinkServer)

            } else {
                res.send('You are not authorized to view this data');
            }
        });
    } else {
        res.send('You are not authorized to view this data');
    }
}