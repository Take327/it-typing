import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        width: '100%',
        height: '70vh'
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

type Props = {
    loginState: boolean
}



const Top: React.FC<Props> = ({ loginState }) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {(() => {
                if (!loginState) {
                    return (
                        <>
                            <CardContent>
                                <Typography variant="h5" component="h2">IT-TYPING</Typography>
                                <Typography variant="h6" component="h3">使用方法</Typography>
                                <Typography variant="body1" component="p">
                                    「IT-TYPING」ではIT用語などユーザーが自由にタイピングテキストを作成し、タイピング練習を行うことができます。
                                </Typography>
                                <Typography variant="body1" component="p">
                                    ユーザー登録を行うことでユーザー別にテキストを保存することができます。
                                </Typography>
                                <Typography variant="body1" component="p">
                                    ユーザー独自のタイピングテキストを作成することで、日常的にタイピングする機会の多い、ワードを反復練習することができます。
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h6" component="h3">ユーザー登録</Typography>
                                <Typography variant="body1" component="p">
                                    ユーザー登録にはメールアドレスとパスワードを必要とします。
                                </Typography>
                                <Typography variant="body1" component="p">
                                    ユーザー登録は<Link to="/signup">こちら</Link>から
                                </Typography>
                            </CardContent>
                        </>
                    )
                } else {
                    return (
                        <>
                            <CardContent>
                                <Typography variant="h5" component="h2">ようこそ!</Typography>
                            </CardContent>
                        </>
                    )
                }
            })()}
        </Card>
    )
}

export default Top