//create cafe users model 
const { sendMail } = require('../util/mailSMTP');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cafeUsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe',
    },
    role: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});




cafeUsersSchema.pre('save', function (next) {
    let user = this;

    sendMail({
        to: user.email,
        subject: "Welcome to SOS",
        text: 'You vendor account successfully created',
        html: ` <h1>Welcome to SOS</h1>
                <br>
                <br>
            <p>You have successfully registered as vendor at Start Of Stories</p>
                <br>
            <p>You can now login using this credential at pos.startofstories.com <br> <b>username :<b>${user.email} <b>password :<b>${user.password} </p>

    `
    });


    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});


cafeUsersSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
const CafeUsers = mongoose.model('cafeUsers', cafeUsersSchema);


module.exports = CafeUsers;