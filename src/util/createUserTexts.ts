import { app } from '../config/firebase'


const createUserTexts = async () => {

    const functions = app.functions()
    const func = functions.httpsCallable("getDefaultTyping");
    //const func = functions.httpsCallable("getDefaultTypingTexts");

    //subブランチ
    console.log(func);

}

export default createUserTexts

