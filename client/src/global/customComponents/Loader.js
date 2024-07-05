import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const Loader = () => {
    return (
        <div className='loader'>
            <CircularProgress />
            <p>Loading...</p>
        </div>
    )
};

export default Loader;