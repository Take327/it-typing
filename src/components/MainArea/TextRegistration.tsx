import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import './TextRegistration.css';
import getDefault from '../../util/getDefault';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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
        padding: "20px"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "400px"
    },
    addButton: {
        backgroundColor: '#81d8d0'
    },
    fabGreen: {
        margin: '10px',
        backgroundColor: '#81d8d0',
        '&:hover': {
            backgroundColor: '#fadbda',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));


const TextRegistration = () => {

    const classes = useStyles();

    const [row, setRow] = useState<TypingText[]>([]);
    const [loadStatus, setLoadStatus] = useState<boolean>(false);

    const initialTyping = (json: TypingText[] | undefined) => {
        if (json !== undefined) {
            setRow(json)
        }
    }

    useEffect(() => {
        if (!loadStatus) {
            getDefault().then(json => {
                initialTyping(json)
                setLoadStatus(true)
            });
        }
    });

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

    const postAction =()=>{
        alert("登録しました")
    }

    return (
        <Card className={classes.root} variant="outlined">
            {(() => {
                if (loadStatus) {
                    return (<>
                        <div>
                            <table>
                                <tr>
                                    <th className="tableHead">行No</th><th className="tableHead">オリジナルテキスト</th><th className="tableHead">カナテキスト</th><th className="tableHead"></th>
                                </tr>
                                {row.map((data, index) => (
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
                        </div>
                        <div className="addButton">
                            <Fab className={classes.fabGreen} aria-label="done" onClick={postAction}>
                                <DoneIcon color="action" />
                            </Fab>
                            <Fab className={classes.fabGreen} aria-label="add" onClick={rowAdd}>
                                <AddIcon color="action" />
                            </Fab>
                        </div>
                    </>
                    )
                }
            })()}

            <Backdrop className={classes.backdrop} open={!loadStatus}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>

    )
}

export default TextRegistration