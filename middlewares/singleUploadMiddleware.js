const upload = require('../util/upload');


const uploadFile = (req, res, next) => {


    upload(req, res, (err) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.json({
                    msg: 'Error: No File Selected!'
                });
            } else {
                req.body.image = `public/${req.file.filename}`;
                next()
            }
        }
    });
}

module.exports = uploadFile;