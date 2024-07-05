import React, { useState } from 'react';
import sideImage from '../../assets/images/side-image.jpg';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';
import { login } from '../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import useUsersApi from '../../global/hooks/useUsersApi';




const LoginPage = () => {

    const { users } = useUsersApi('/users');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    const handleLoginClick = async () => {
        if (userData.email == '' || userData.password == '') {
            alert('All fields are required')
        } else {
            if (users) {
                const filteredUsers = users.filter((item) => item.email === userData.email && item.password === userData.password)
                filteredUsers.length <= 0 ? alert('user not found') : navigate('/profile-page');
                filteredUsers.find((existingUser)=> {
                    const check = existingUser.email === userData.email && existingUser.password === userData.password;
                    if (check) {
                        dispatch(addUser(existingUser))
                        if (userData) {
                            dispatch(login(userData))
                        }
                    }
                })
            }
        }
    }

    return (
        <section className='registration'>
            <div className='image-holder left'>
                <img src={sideImage} />
            </div>
            <div className='right'>
                <div className='heading'>
                    <h4>Log in to your Account</h4>
                    <p>Enter Your details below </p>
                </div>
                <form className='registration-form'>
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
                <div className='buttons login'>
                    <PrimaryButton label='Login' onClick={handleLoginClick} />
                    <p>Don't have an account ?
                        <Link to='/sign-up'> Sign-in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
};

export default LoginPage;