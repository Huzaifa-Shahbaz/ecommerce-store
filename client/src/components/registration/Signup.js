import React, { useState } from 'react';
import sideImage from '../../assets/images/side-image.jpg';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import useUsersApi from '../../global/hooks/useUsersApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';


const Signup = () => {

    const { insertNewUser, errorMsg } = useUsersApi('/users');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        firstName: '',
        password: '',
        email: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const submit = async () => {
        const validation = userData.firstName === '' || userData.email === '' || userData.password === '';
        validation ?
        alert('please fill all fields')
        :
        insertNewUser(userData);
        dispatch(addUser(userData));
        errorMsg === '' ? console.log('error') : navigate('/')
    }

    return (
        <section className='registration'>
            <div className='image-holder left'>
                <img src={sideImage} />
            </div>
            <div className='right'>
                <div className='heading'>
                    <h4>Create an account</h4>
                    <p>Enter Your details below </p>
                </div>
                <form className='registration-form'>
                    <input
                        name='firstName'
                        placeholder='Name'
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        name='email'
                        placeholder='Email or Phone Number'
                        onChange={handleChange}
                        value={userData.email}
                    />
                    <input
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={userData.password}
                    />
                </form>
                <div className='buttons'>
                    <PrimaryButton label='Create Account' onClick={submit} />
                    {errorMsg && <p className='error-msg'>{errorMsg}</p>}
                    <p>Already have account ?
                        <Link to='/login' > Log in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
};

export default Signup;