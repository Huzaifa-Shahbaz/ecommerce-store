import React from 'react';
import Form from './Form';



const MyProfile = ({index}) => {

    const tabTitle = 'My Profile'

    return (
        <div
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <Form />
        </div>
    )
};

export default MyProfile;