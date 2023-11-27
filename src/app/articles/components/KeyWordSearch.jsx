'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const KeyWordSearch = () => {
    const keyword = ['自己分析', 'ES', '面接対策', 'グループディスカッション'];

    return (
        <Autocomplete
            disablePortal
            id="combo-box"
            options={keyword}
            sx={{ width: 300 }}
            renderInput={(options) => <TextField {...options} label="絞り込み" />}
        />
    );
}

export default KeyWordSearch;