const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'ktln-appshoesshop.appspot.com',
    // databaseURL: "https://cnpmm-4b1a2-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const bucket = admin.storage().bucket();

module.exports = bucket;
