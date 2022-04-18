const aws = require('aws-sdk');




exports.getFileUpload = async function (req, res) {


    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRETE_KEY_ID,
        region: process.env.AWS_S3_REGION,
        signatureVersion: 'v4'
    });

    const params = ({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.query.key,
        Expires: 360,
    });

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    res.json({
        uploadUrl
    });

};