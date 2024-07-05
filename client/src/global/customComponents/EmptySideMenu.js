import React from 'react';
import { Link } from 'react-router-dom';

const EmptySideMenu = ({icon, title, text}) => {
    return (
        <div className='side-bar-empty'>
            <img src={icon} width={120}/>
            <h4>{title}</h4>
            <p>{text}</p>
            <Link to='/products-page' >
                <a href='#products_listing' className='btn btn-underline'>Explore our latest products</a>
            </Link>
        </div>
    )
};

export default EmptySideMenu;