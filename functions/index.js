const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const log = (uid, activity) => {
    const dt = new Date();
    const data ={
        'action': activity,
        'time': dt
    }
    return admin.firestore().collection('users').doc(uid).collection('activities').doc(String(dt.getTime())).set(data);
}

exports.logUserDeletion = functions.auth.user().onDelete(user => {
    return log(user.uid, 'deleted account');
})

exports.logUserCreation = functions.auth.user().onCreate(user => {
    return log(user.uid, 'created account');
})

exports.userActivityCountIncremental = functions.firestore.document('/users/{userId}/activities/{activityId}').onCreate((snap, context) => {
    //console.log('detect '+context.params.userId+' new log: '+context.params.activityId);
    return admin.firestore().collection('users').doc(context.params.userId).set({'activityCount':admin.firestore.FieldValue.increment(1)},{merge: true});
})