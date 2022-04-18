const nodemailer = require('nodemailer');




//send mail from here using nodemailer

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yash.startofstories@gmail.com',
        pass: 'akwrkebshxnltfqt'
    }
});

exports.sendMail = (mailOptions) => {
    let mailDetails = {
        from: 'hello@startofstories.com',
        ...mailOptions
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent successfully');
        }
    });
}