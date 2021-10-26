const uuid = require('uuid-v4');
const bucket = require('../commons/configs/firebase');
const fs = require('fs');

class BaseController {
    constructor() {}
    sendSuccess(res, data, status = 200, message = 'success') {
        return res.status(status).json({
            message: message,
            data: data,
        });
    }

    sendError(res, message) {
        return res.status(500).json({
            message: message || 'internal server error',
        });
    }
    async UploadImage(name, folder) {
        const path = './uploads/' + name;
        const metadata = {
            metadata: {
                // This line is very important. It's to create a download token.
                firebaseStorageDownloadTokens: uuid(),
            },
            contentType: 'image/png',
            cacheControl: 'public, max-age=31536000',
        };

        const tasks = await bucket.upload(path, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true, //nén hình
            metadata: metadata,
            destination: folder + name,
        });

        const urls = await tasks[0].getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        // Delete image
        fs.unlinkSync(path);

        return urls[0];
    }
}
module.exports = new BaseController();
