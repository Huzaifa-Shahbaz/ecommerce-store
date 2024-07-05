import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromList } from '../../redux/slices/favSlice';




const SideBarCard = ({data}) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const viewDetails = (data)=> {
        navigate('details-page', {state: data,})
    }    

    return (
        <div className='side-bar-card'>
            <figure className='image-holder'>
                <img src={data?.thumbnail} alt='image' />
            </figure>
            <div className='description'>
                <h4>{data?.title}</h4>
                <p>{data?.description}</p>
                <div className='d-flex buttons-group'>
                    <button onClick={()=> viewDetails(data)} className='btn btn-underline'>View Details</button>
                    <button onClick={()=> dispatch(removeFromList(data.id))} className='btn btn-remove'>Remove</button>
                </div>
            </div>
        </div>
    )
};

export default SideBarCard;