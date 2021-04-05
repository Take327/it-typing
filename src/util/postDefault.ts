type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}


const postDefault = async (body: TypingText[]) => {
    console.log('postDefault動きました')
    const url = 'https://us-central1-it-typing.cloudfunctions.net/updateTextList-updateTextList';
    const bodyJson = JSON.stringify({ kotowaza: body })

    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body: bodyJson
    });

    const result = res.json

    return result;
}

export default postDefault