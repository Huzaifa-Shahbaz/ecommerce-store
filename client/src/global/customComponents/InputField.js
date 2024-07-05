import React from 'react';



const InputField = ({ customStyle, name, label, placeHolderText, onInput, text, readOnly}) => {
    return (
        <div className='input-group'>
            <label>{label}</label>
            <input
                style={customStyle}
                name={name}
                value={text}
                onChange={onInput}
                placeholder={placeHolderText} 
                className='input-field' 
                required
                readOnly={readOnly}
            />
        </div>
    )
};

export default InputField;