import React from 'react';

const SectionHeading = ({title, heading}) => {
    return (
        <span className='section-heading'>            
            <h4>{title}</h4>
            <h3>{heading}</h3>
        </span>
    )
};

export default SectionHeading;