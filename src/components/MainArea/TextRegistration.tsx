import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
        padding: "20px",
        "& table": {
            borderCollapse: "collapse;",
            innerWidth: 500
        },
        "& th": {
            border: "1px #000000 solid;",
        },
        "& td": {
            border: "1px #000000 solid;",
        },
        "& input[type=text]":{
            width:"200px"
        }
    },
});

const TextRegistration = (props: Props) => {

    const classes = useStyles();

    const rows = props.typingText

    return (
        <Card className={classes.root} variant="outlined">
            <table>
                <tr>
                    <th>id</th><th>OriginalText</th><th>KanaText</th><th></th>
                </tr>
                {rows.map((data) => (
                    <tr>
                        <td>{data.id}</td>
                        <td><input type="text" value={data.originalText} /></td>
                        <td><input type="text" value={data.kanaText} /></td>
                        <td>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </table>
        </Card>

    )
}

export default TextRegistration