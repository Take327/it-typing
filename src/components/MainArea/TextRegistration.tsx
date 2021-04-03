import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { cyan } from '@material-ui/core/colors';

type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}

type Props = {
    typingText: TypingText[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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
            width: "aute",
            minWidth: "50px"
        },
        "& td": {
            border: "1px #000000 solid;",

        },
        "& input[type=text]": {
            width: "200px"
        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 'aute',
    },
    addButton: {
        backgroundColor: '#81d8d0'
    },
    fabGreen: {
        backgroundColor: '#81d8d0',
        '&:hover': {
            backgroundColor: '#fadbda',
        },
    }
}));



const TextRegistration = (props: Props) => {

    const classes = useStyles();

    const rows = props.typingText

    const [row, setRow] = useState(props.typingText);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetId: number = Number(e.target.id.replace(/^.+_/, ''));
        let targetData = row.find((value) => {
            return value.id === targetId
        });

        console.log(targetData);

        if (targetData) {
            const target = e.target.id.replace(/_.+$/, '');
            switch (target) {
                case 'originalText':
                    targetData.originalText = e.target.value
                    break;
                case 'kanaText':
                    targetData.kanaText = e.target.value
                    break;
                default:
                    break;
            }
        }
        const resultArry = row.map((value) => {
            if (value.id === targetData?.id) {
                return targetData
            } else {
                return value
            }
        });

        setRow(resultArry);
    }

    const rowDelete = (targetId: number) => {
        if (confirm("削除してもいいですか？")) {
            let targetData = row.find((value) => {
                return value.id === targetId
            });
            console.log(targetData);

            const resultArry = row.filter((value) => {
                return value !== targetData
            })

            setRow(resultArry);
        }
    }

    const rowAdd = () => {
        const idArry: number[] = row.map((value) => { return value.id; })
        const nextId: number = Math.max(...idArry) + 1;

        const nextTypingText: TypingText = { id: nextId, originalText: '', kanaText: '' }

        const resultArry = row.map((value) => { return value });

        resultArry.push(nextTypingText);

        setRow(resultArry);


    }

    return (
        <Card className={classes.root} variant="outlined">
            <div>
                <table>
                    <tr>
                        <th>id</th><th>OriginalText</th><th>KanaText</th><th></th>
                    </tr>
                    {row.map((data) => (
                        <tr>
                            <td>{data.id}</td>
                            <td><TextField id={`originalText_${data.id}`} className={classes.textField} value={data.originalText} onChange={handleChange} fullWidth /></td>
                            <td><TextField id={`kanaText_${data.id}`} className={classes.textField} value={data.kanaText} onChange={handleChange} fullWidth /></td>
                            <td>
                                <IconButton aria-label="delete" onClick={() => rowDelete(data.id)} name={`delete_${data.id}`}>
                                    <DeleteIcon name={`delete_${data.id}`} />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </table>
                <Fab className={classes.fabGreen} aria-label="add" onClick={rowAdd}>
                    <AddIcon color="action" />
                </Fab>
            </div>
        </Card>

    )
}

export default TextRegistration