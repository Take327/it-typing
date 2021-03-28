import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';


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
            width: "500px"
        },
        "& input[type=text]": {
            width: "200px"
        }
    },
    textField: {
        width: "300px"
    }
});



const TextRegistration = (props: Props) => {

    const classes = useStyles();

    const rows = props.typingText

    const [row, setRow] = useState(props.typingText);

    const handleChange = (e: HTMLInputElement) => {
        const targetId: string = e.id;


    }

    return (
        <Card className={classes.root} variant="outlined">
            <table>
                <tr>
                    <th>id</th><th>OriginalText</th><th>KanaText</th><th></th>
                </tr>
                {rows.map((data) => (
                    <tr>
                        <td>{data.id}</td>
                        <td><TextField id="standard-basic" className={classes.textField} value={data.originalText} /></td>
                        <td><TextField id="standard-basic" className={classes.textField} value={data.kanaText} /></td>
                        <td>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </table>
            <table>
                <tr>
                    <th>id</th><th>OriginalText</th><th>KanaText</th><th></th>
                </tr>
                {row.map((data) => (
                    <tr>
                        <td>{data.id}</td>
                        <td><TextField id={`originalText_${data.id}`} className={classes.textField} value={data.originalText} /></td>
                        <td><TextField id={`kanaText_${data.id}`} className={classes.textField} value={data.kanaText} /></td>
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