import React from 'react';

const PrimaryButton = ({label, onClick, customStyle}) => {
    return (
        <button 
            onClick={onClick} 
            className='btn-primary'
            style={customStyle}
        >{label}</button>
    )
};

export default PrimaryButton;