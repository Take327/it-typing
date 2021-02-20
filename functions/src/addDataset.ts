import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"


const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
}

export const addDataset = functions.https.onRequest(async (reqest: any, respons: any) => {
    admin.initializeApp();
    const db = admin.firestore();
    
    if (reqest.method != 'POST') {
        sendResponse(respons, 405, { error: 'Invalid Request!' })
    } else {
        const dataset = reqest.body;
        for (const key of Object.keys(dataset)) {
            const data = dataset[key];
            await db.collection('typingTexts').doc(key).set(data);
        }
        sendResponse(respons, 200, { message: 'Succsessfully' })
    }

});