var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempCafeSchema = new Schema({
    name: { type: String, max: 100 },
    propertyType: { type: String, max: 100 },
    branchName: { type: String, max: 100 },
    contactPerson: { type: String, max: 100 },
    contactPersonDesignation: { type: String, max: 100 },
    contactNumber: { type: String, max: 100 },
    email: { type: String, max: 100 },
    address: { type: String, max: 100 },
    placeBestFor: { type: Array },
    latitude: { type: String, max: 100 },
    longitude: { type: String, max: 100 },
    typeOfPlace: { type: String, max: 100 },
    numberOfTables: { type: String, max: 100 },
    numberOfChairs: { type: String, max: 100 },
    status: { type: String, max: 100 },
    nextMeetingDate: { type: String, max: 100 },
    nextMeetingTime: { type: String, max: 100 },
    otherReferences: { type: String, max: 100 },
    stepOneDone: { type: Boolean },
    paymentLink: { type: String, max: 100 },
    paymentLinkId: { type: String, max: 100 },
    imageOfCafeBoard: { type: String, max: 100 },
    imageOfManager: { type: String, max: 100 },
    agreementSignPath: { type: String, max: 100 },
    propertyPAN: { type: String, max: 100 },
    gumastaPath: { type: String, max: 100 },
    stepTwoDone: { type: Boolean },
    paymentAmount: { type: String, max: 100 },
    paymentHours: { type: String, max: 100 },
    paymentMod: { type: String, max: 100 },
    generatedOTP: { type: String, max: 100 },
    stepThreeDone: { type: Boolean },
    finalApproved: { type: Boolean, default: false },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'onboarder'
    }
}, {
    timestamps: true
});


// Export the model
module.exports = mongoose.model('TempCafe', tempCafeSchema);