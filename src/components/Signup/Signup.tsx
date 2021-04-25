import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import { app } from '../../config/firebase'
import { createNewUser } from '../../util/sign/createNewUser'
import createUserTexts from '../../util/createUserTexts'

type State = {
    emailCheck: boolean,
    passwordCheck: boolean,
    passwordconfirmCheck: boolean
}

const initialState: State = {
    emailCheck: true,
    passwordCheck: true,
    passwordconfirmCheck: true
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        width: 400,
        margin: `${theme.spacing(0)} auto`
    },
    card: {
        marginTop: theme.spacing(10),
        width: 400

    },
    header: {
        textAlign: "center",
        background: "#81d8d0",
        color: "#fff"
    },
    cardContent: {
        display: "flex",
        flexFlow: "column"
    }


}))

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordconfirm, setPasswordconfirm] = useState<string>('');
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
            case 'password-confirm':
                setPasswordconfirm(e.target.value);
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
            case 'password':
                if (password !== '' && passwordconfirm !== '') {
                    if (password === passwordconfirm) {
                        nowState.passwordconfirmCheck = true;
                    } else {
                        nowState.passwordconfirmCheck = false;
                    }
                } else {
                    nowState.passwordconfirmCheck = true;
                }
                break;
            case 'password-confirm':
                if (password !== '' && passwordconfirm !== '') {
                    if (password === passwordconfirm) {
                        nowState.passwordconfirmCheck = true;
                    } else {
                        nowState.passwordconfirmCheck = false;
                    }
                } else {
                    nowState.passwordconfirmCheck = true;
                }
                break;
            default:
                break;
        }

        setStates(nowState);
    }

    const inputCheck = (state: State) => {
        if (email !== '' && password !== '' && passwordconfirm !== '') {
            if (state.emailCheck && state.passwordCheck && state.passwordconfirmCheck) {
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
        createUserTexts();
    }, [state])

    const signupAction = async (email: string, password: string) => {
        if(await createNewUser(email,password)){
            alert('登録されました。');
        }
    };


    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="新規登録" />
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
                    <TextField
                        error={!state.passwordconfirmCheck}
                        fullWidth
                        id="password-confirm"
                        type="password"
                        label="パスワード再入力"
                        placeholder="パスワード再入力"
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleError}
                    />
                    <div>アカウントをお持ちの方は<Link to="/login">こちら</Link></div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" disabled={isButtonDisabled} fullWidth onClick={() => signupAction(email, password)}>Signup</Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default Signup