import React from 'react';    
import InputField from '../../global/customComponents/InputField';



const Form = ({formData, setFormData}) => {

    const handleChange = (event)=> {
        const { name, value } = event.target;
        setFormData({
            ...formData, 
            [name]: value,
        });
    }


    return (
        <from className='billing-form'>
            <InputField
                name='firstName'
                onInput={handleChange}
                text={formData.firstName}
                label='First Name'
            />
            <InputField
                name='email'
                onInput={handleChange}
                text={formData.email}
                label='Email Address'
            />
            <InputField 
                name='streetAddress'
                onInput={handleChange}
                text={formData.streetAddress}
                label='Street Address'
            />
            <InputField 
                name='city'
                text={formData.city}
                onInput={handleChange}
                label='Town / City'
            />
            <InputField
                name='phoneNumber'
                onInput={handleChange}
                text={formData.phoneNumber}
                label='Phone Number'
            />
            <InputField 
                name='city'
                text={formData.city}
                onInput={handleChange}
                label='Town / City'
            />
            <input type='submit' className='btn-primary' style={{marginTop: '20px',}} value='Save Details' />
        </from>
    )
};

export default Form;