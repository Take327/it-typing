import * as React from 'react';
import { DataGrid, ValueGetterParams } from '@material-ui/data-grid';

type Props = {
    typingText: {
        id: number,
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

    const rows = props.typingText

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: '#FFF' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}

export default TextRegistration