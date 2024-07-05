import React from 'react';



const ProductCounter = ({value, onIncrement, onDecrement}) => {    
    

    return (
        <div className='quantity'>
            <span>{value}</span>
            <div className='buttons'>
                <button onClick={onIncrement} className='btn action-btn'>
                    <img src={require('../../assets/icons/up-arrow.png')} width={14} />
                </button>
                <button onClick={onDecrement} className='btn action-btn'>
                <img src={require('../../assets/icons/down-arrow.png')} width={14} />
                </button>
            </div>
        </div>
    )
};

export default ProductCounter;