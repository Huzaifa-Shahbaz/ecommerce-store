import React, { useState } from 'react';
import useUsersApi from '../../global/hooks/useUsersApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, selectIsAuthenticated } from '../../redux/slices/adminAuthSlice';



const LoginPage = () => {
    
    const dispatch = useDispatch()
    const credentials = JSON.parse(localStorage.getItem('adminInfo'))
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { users: adminCredentials } = useUsersApi('/admin');

    const [formData, setFormData] = useState({        
        userName: credentials?.userName || '',
        password: credentials?.password || '',
    })

    const handleChange = (event)=> {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const submitForm = ()=> {
        if(formData.userName === '' || formData.password === '') {
            alert('fill all fields')
        } else {

            dispatch(adminLogin(formData))

            // const foundAdmin = adminCredentials?.find(
            //     (i)=> i.userName === formData.userName && i.password === formData.password
            // )
            // if (foundAdmin) {
            //     dispatch(adminLogin(formData))                
            // } else {
            //     alert('User not found');
            // }
        }
    }

    return (
        <div className='login-page'>
            <div className='login-form'>
                <p>Login !</p>
                <form>
                    <input
                        name='userName'
                        placeholder='user name'
                        onChange={handleChange}
                        value={formData.userName}
                    />
                    <input
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={formData.password}
                    />
                </form>
                <button onClick={submitForm} className='btn'>Submit</button>
            </div>
        </div>
    )
};

export default LoginPage;