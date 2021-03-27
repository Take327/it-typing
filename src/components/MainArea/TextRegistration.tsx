import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


type Props = {
    typingText: {
        id: number,
        originalText: string,
        kanaText: string
    }[]
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: "100%",
        padding:"20px",
        "& table": {
            border: "1px #000000 solid;",
        },
        "& th": {
            border: "1px #000000 solid;",
        },
        "& td": {
            border: "1px #000000 solid;",
        },
    },
});

const TextRegistration = (props: Props) => {

    const classes = useStyles();

    const rows = props.typingText

    return (
        <Card className={classes.root} variant="outlined">
            <table>
                <tr>
                    <th colSpan={2}>id</th><th>OriginalText</th>
                </tr>
                <tr><th>KanaText</th></tr>
                {rows.map((data) => (
                    <tr>
                        <td>{data.id}</td><td><input type="text" value={data.originalText} /></td><td><input type="text" value={data.kanaText} /></td>
                    </tr>
                ))}
            </table>
        </Card>

    )
}

export default TextRegistration