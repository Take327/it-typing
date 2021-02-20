import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"


export const getDefaultTypingTexts = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (!admin.apps.length) {
        admin.initializeApp();
    }

    const db = admin.firestore();

    const docment = db.collection('typingTexts').doc('default');

    docment.get().then(doc => {
        if (!doc.exists) {
            response.send('No such document');
        } else {
            response.send(JSON.stringify(doc.data()));
        }
    }).catch(err => {
        response.send('no found');
    });
});
