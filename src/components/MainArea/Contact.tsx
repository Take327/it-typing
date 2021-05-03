import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { postSlack } from '../../util/slack/postSlack';

type State = {
    emailCheck: boolean,
    contentsCheck: boolean,
}

const initialState: State = {
    emailCheck: true,
    contentsCheck: true,
}



const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 600,

        margin: `${theme.spacing(0)} auto`
    },
    card: {
        marginTop: theme.spacing(10),
        width: '90vw',
    },
    header: {
        textAlign: "center",
        background: "#81d8d0",
        color: "#fff"
    },
    cardContent: {
        display: "flex",
        flexFlow: "column"
    },
    button: {
        color: '#fff'
    }
}))

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#81d8d0'
        },
    }
});

const Contact: React.FC = () => {
    const classes = useStyles();

    const [email, setEmail] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [state, setStates] = useState<State>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'contents':
                setContents(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleError = (e: React.FocusEvent<HTMLInputElement>) => {
        let nowState: State = Object.assign({}, state);

        switch (e.target.id) {
            case 'email':
                if (email !== '') {
                    const emailReg: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
                    if (emailReg.test(email)) {
                        nowState.emailCheck = true;
                    } else {
                        nowState.emailCheck = false;
                    }
                } else {
                    nowState.emailCheck = true;
                }
                break;
            default:
                break;
        }

        setStates(nowState);
    }

    const sendAction = async (email: string, contents: string) => {

        if(confirm('送信しますか？')){
            if (await postSlack(email, contents)) {
                alert('お問い合わせいただきありがとうございます。\n追ってご連絡をさせていただきます。');
                setEmail('');
                setContents('');
    
            } else {
                alert('お問い合わせ送信に失敗しました。\nお時間を開けて改めてお問い合わせください。');
    
            }
        }
    }

    const inputCheck = (state: State) => {
        if (email !== '' && contents !== '') {
            if (state.emailCheck && state.contentsCheck) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else {
            setIsButtonDisabled(true);

        }
    }

    useEffect(() => {
        inputCheck(state);
    }, [state])



    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="お問い合わせ" />
                <CardContent className={classes.cardContent}>
                    <TextField
                        error={!state.emailCheck}
                        fullWidth
                        id="email"
                        type="email"
                        label="メールアドレス"
                        placeholder="メールアドレス"
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleError}
                        required
                        value={email}
                    />
                    <TextField
                        id="contents"
                        label="お問い合わせ内容"
                        multiline
                        rows={9}
                        required
                        onChange={handleChange}
                        onBlur={handleError}
                        value={contents}
                    />


                </CardContent>
                <CardActions>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" className={classes.button} color="primary" disabled={isButtonDisabled} fullWidth onClick={() => { sendAction(email, contents) }}>送信</Button>
                    </ThemeProvider>
                </CardActions>
            </Card>
        </form>
    )
}

export default Contact;