import * as React from 'react';
import { DataGrid, ValueGetterParams } from '@material-ui/data-grid';

type Props = {
    typingText: {
        originalText: string,
        kanaText: string
    }[]
}

const TextRegistration = (props: Props) => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'originalText', headerName: 'オリジナルテキスト', width: 250 },
        { field: 'kanaText', headerName: 'カナテキスト', width: 250 },
    ];

    
    const rows = [
        {
            id: 1,
            kanaText: "いぬもあるけばぼうにあたる",
            originalText: "犬も歩けば棒に当たる"
        },
        {
            id: 2,
            kanaText: "test",
            originalText: "test"
        },
        {
            id: 3,
            originalText: "豚に真珠",
            kanaText: "ぶたにしんじゅ"
        },
        {
            id: 4,
            kanaText: "いしのうえにもさんねん",
            originalText: "石の上にも三年"
        }
    ]

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: '#FFF' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}

export default TextRegistration