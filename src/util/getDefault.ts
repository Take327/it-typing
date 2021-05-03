const getDefault = async () => {

  type Default = {
    kotowaza: {
      id: number,
      originalText: string,
      kanaText: string
    }[]
  }

  type FetchProfile = () => Promise<Default | null>

  const fetchAction: FetchProfile = async () => {
    const url = 'https://us-central1-it-typing.cloudfunctions.net/getDefaultTypingTexts-getDefaultTypingTexts';
    const response = await fetch(url)
      .then((response) => response)
      .catch((error) => {
        return null
      })

    // responseがnullならfetchに失敗している
    if (!response) {
      return null
    }

    const json = await response
      .json()
      .then((json: Default) => {
        return json
      })
      .catch((error) => {
        console.error(error)
        return null
      })

    // jsonがnullならレスポンスBodyの読み取りに失敗している
    if (!json) {
      return null
    }

    return json
  }

  const result = await fetchAction();

  return result?.kotowaza;
}

export default getDefault;