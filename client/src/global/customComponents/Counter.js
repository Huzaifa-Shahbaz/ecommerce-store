import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProdQuantity } from '../../redux/slices/cartSlice';



const Counter = () => {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(updateProdQuantity(quantity))
    }, [quantity])


    const add = ()=> {
        quantity === 8 ? alert('error') : setQuantity(quantity + 1);
    }
    const reduce = ()=> {
        quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1)
    }

    return (
        <div className='quantity'>
            <button onClick={add} className='btn action-btn'>+</button>
            <span>{quantity}</span>
            <button onClick={reduce} className='btn action-btn'>-</button>            
        </div>
    )
};

export default Counter;