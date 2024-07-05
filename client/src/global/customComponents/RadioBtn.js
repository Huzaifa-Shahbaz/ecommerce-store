import React, { useState } from 'react';



const RadioBtn = ({label, handleOptionClick}) => {

    return (
        <div onClick={handleOptionClick} className='radio'>
            <label className="radio-label">
                <input
                    name="RadioBtn"
                    value={label}
                    type="radio"
                />
                <span className="radio-button"></span>
                <p>{label}</p>
            </label>
        </div>
    )
};

export default RadioBtn;