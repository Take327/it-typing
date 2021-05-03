

export const postSlack = async (email: string, contents: string) => {
    try {
        const payload = {
            text:
                'お問い合わせがありました。\n' +
                '■メールアドレス:' + email + '\n' +
                '■お問い合わせ内容\n' + contents
        }

        const url = process.env.REACT_APP_FB_SLACK_WEBHOOK_URL

        if (!url) {
            return false;
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        return true;

    } catch (err) {
        return false;
    }

}