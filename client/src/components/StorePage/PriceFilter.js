import React from 'react';




const PriceFilter = ({onPress, toggle, minPrice, maxPrice, onChange, FilterProducts}) => {
    return (
        <div className='filter'>
            {toggle === true ? 
                <button onClick={FilterProducts} className='btn'>
                    Apply Filter
                </button>
                :
                <button 
                    onClick={onPress} 
                    className='btn' 
                    style={{
                        background: toggle === true ? '#f3f3f3' : "#ffffff",
                    }} 
                >
                    <img src={require('../../assets/icons/filter.png')} width={30} /> Price Filter                    
                </button>
            }            
            {toggle == true ? 
                <input
                    type='range'
                    min={minPrice}
                    max={maxPrice}
                    onChange={onChange}
                />
                :
                null
            }
        </div>
    )
};

export default PriceFilter;