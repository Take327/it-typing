import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"



export const getDefaultTypingTexts = functions.https.onRequest((request, response) => {
    admin.initializeApp(functions.config().firebase)

    const fireStore = admin.firestore();

    const docment = fireStore.collection('typingTexts').doc('default');

    docment.get().then(doc => {
        if (!doc.exists) {
            response.send('No such document');
        } else {
            console.log(doc.data())
            response.send(doc.data());
        }
    }).catch(err => {
        response.send('no found');
    });
});
