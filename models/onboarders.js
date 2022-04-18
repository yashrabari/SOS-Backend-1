const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const onboardersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: { type: String, required: true, index: true, unique: true },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});


onboardersSchema.pre('save', function (next) {
    var onboarder = this;
    if (onboarder.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(onboarder.password, salt, function (err, hash) {
                onboarder.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

onboardersSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};






const Onboarder = mongoose.model('Onboarder', onboardersSchema);

module.exports = Onboarder;



