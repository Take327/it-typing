import { app } from '../config/firebase'


const createUserTexts = () => {

    const functions = app.functions()
    const func = functions.httpsCallable("createUser");
    //const func = functions.httpsCallable("getDefaultTypingTexts");
    //func({ date: 'test' }).then((result)=>console.log(result)).catch((err)=>console.log(err));
    //subブランチ

}

export default createUserTexts

