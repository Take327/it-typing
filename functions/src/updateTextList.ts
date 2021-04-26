import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"

type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}

type RequestBody = {
    kotowaza: TypingText[]
}



const sendResponse = (response: functions.Response, statusCode: number, body: Object) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
}

export const updateTextList = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type, authorization');

    if (!admin.apps.length) {
        admin.initializeApp();
    }
    const db = admin.firestore();

    if (request.method !== 'POST') {
        sendResponse(response, 405, { error: 'Invalid Request!' })
    } else {
        const dataset: RequestBody = request.body;
        await db.collection('typingTexts').doc('default').set(dataset);
        sendResponse(response, 200, { message: 'Succsessfully' })
    }







})

