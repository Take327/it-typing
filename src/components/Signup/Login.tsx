import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { login } from '../../reducks/user/operations'




type State = {
    emailCheck: boolean,
    passwordCheck: boolean,
}

const initialState: State = {
    emailCheck: true,
    passwordCheck: true,
}




const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 400,

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

type Props = {
    changeLoginState: Function
}

const Login: React.FC<Props> = ({ changeLoginState }) => {
    const history = useHistory()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [state, setStates] = useState<State>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
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

    const inputCheck = (state: State) => {
        if (email !== '' && password !== '') {
            if (state.emailCheck && state.passwordCheck) {
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


    const loginAction = (email: string, password: string) => {
        login(email, password)
        history.push('/')

    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="ログイン" />
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
                    />
                    <TextField
                        error={!state.passwordCheck}
                        fullWidth
                        id="password"
                        type="password"
                        label="パスワード"
                        placeholder="パスワード"
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleError}
                    />
                    <div>新規登録は<Link to="/signup">こちら</Link></div>
                </CardContent>
                <CardActions>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" className={classes.button} color="primary" disabled={isButtonDisabled} fullWidth onClick={() => loginAction(email, password)}>Login</Button>
                    </ThemeProvider>
                </CardActions>
            </Card>
        </form>
    )
}

export default Login