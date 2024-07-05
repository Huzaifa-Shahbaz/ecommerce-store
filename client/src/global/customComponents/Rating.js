import React from 'react';



const Rating = ({rating}) => {
    
    const createStarRating = (data)=> {
        let stars = '';
        for (let i = 1; i <=5; i++) {
            i <= data ? stars += '★' : stars += '☆'
        }
        return <p className='stars'>{stars}</p>;
    }
    
    return (
        <>
            {createStarRating(rating)}<span>({rating})</span>
        </>        
    )

};

export default Rating;