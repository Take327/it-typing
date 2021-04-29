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
import postDefault from '../../util/postDefault'
import { getUserTexts } from '../../util/loginUserFunc/getUserTexts'
import { setUserTexts } from '../../util/loginUserFunc/setUserTexts'


type TypingText = {
    id: number,
    originalText: string,
    kanaText: string
}

type Error = {
    id: number,
    message: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: 275,
        height: "100%",
        overflowY: "auto",
        padding:'10px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25vw"
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
    },
    addButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'absolute',
        top: '70vh',
        right: '5vw'
    }
}));

type Props = {
    loginStatus: boolean
}


const TextRegistration: React.FC<Props> = ({ loginStatus }) => {

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
            if (loginStatus) {
                getUserTexts().then((data) => {
                    initialTyping(data)
                    setLoadStatus(true)
                });
            } else {
                getDefault().then(json => {
                    initialTyping(json)
                    setLoadStatus(true)
                });
            }
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetId: number = Number(e.target.id.replace(/^.+_/, ''));
        let targetData = row.find((value) => {
            return value.id === targetId
        });

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
        if (confirm(`ID:${targetId} 削除してもいいですか？`)) {
            const targetData = row.find((value) => {
                return value.id === targetId
            });
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

    const postAction = () => {
        const reg = new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g);
        const errorArry: string[] = [];
        row.forEach((value) => {
            if (value.originalText === '') {
                errorArry.push(`ID:${value.id} オリジナルテキストが入力されていません。`);
            }
            if (value.kanaText === '') {
                errorArry.push(`ID:${value.id} カナテキストが入力されていません。`);
            } else if (reg.test(value.kanaText)) {
                errorArry.push(`ID:${value.id} [半角英数]及び[ひらがな][カタカナ]以外はカナテキストへ入力できません`);
            }
        });

        if (errorArry.length > 0) {
            const alertText = errorArry.join('\n')
            alert(alertText)
        } else {
            if (loginStatus) {
                setUserTexts(row).then(() => alert("登録しました")).catch(() => alert("登録に失敗しました。"))
            } else {
                postDefault(row).then(res => alert("登録しました"))
            }

        }

    }

    return (
        <Card className={classes.root} variant="outlined">
            {(() => {
                if (loadStatus) {
                    return (<>
                        <div className="tableArea">
                            <table>
                                <tr>
                                    <th className="tableHead1">ID</th><th className="tableHead2">オリジナルテキスト</th><th className="tableHead3">カナテキスト</th><th className="tableHead4"></th>
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

                        <div className={classes.addButton}>
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