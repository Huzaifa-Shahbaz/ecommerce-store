import React from 'react';
import Rating from './Rating';



const ProductCard2 = ({ data, onEdit, onDelete }) => {

    const img = JSON.parse(data?.images)

    return (
        <div className='card card-2'>
            <figure className='image-holder'>
                <img src={img[0] ? img[0] : require('../../assets/images/no-image.png')} alt="Product" />
            </figure>
            <div className='description'>
                <h5>{data?.title}</h5>
                <p>{data?.description}</p>
                <div className='d-flex price'>
                    <span>$ {data?.price}</span>
                </div>
                <div className='rating'>
                    <Rating rating={data.rating} />
                </div>
                <div className='buttons'>
                    <button onClick={()=> onEdit(data)} className='btn btn-underline'>Edit</button>
                    <button onClick={()=> onDelete(data.id)} className='btn btn-underline'>Delete</button>
                </div>
            </div>
        </div>
    )
};

export default ProductCard2;