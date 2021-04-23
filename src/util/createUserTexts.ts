import { app } from '../config/firebase'


const createUserTexts = async () => {

    const functions = app.functions()

    const func = functions.httpsCallable("getDefaultTypingTexts");

    console.log(func);

}

export default createUserTexts

