const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.logUserDeletion = functions.auth.user().onDelete(user => {
    const dt = new Date();
    const data ={
        'action': 'deleted account',
        'time': dt
    }
    return admin.firestore().collection('users').doc(user.uid).collection('activities').doc(String(dt.getTime())).set(data);
})