import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserAuthenticated } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { removeUser, usersSelector } from '../../redux/slices/userSlice';
import MyProfile from './MyProfile';
import MyCart from './MyCart';
import ConfirmationPopUp from '../../global/customComponents/ConfirmationPopUp';




const ProfilePage = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState('My Profile');

    const dispatch = useDispatch()
    const userAuthenticated = useSelector(selectUserAuthenticated);
    const userBio = useSelector(usersSelector);


    const modalState = ()=> {
        setShowModal(!showModal)
    }
    const handleLogoutClick = ()=> {
        dispatch(logout()) 
        dispatch(removeUser())
        modalState(!showModal)
    }


    return (
        <section className='profile-page'>
            <ConfirmationPopUp
                show={showModal}
                onHide={modalState}
                title='Logout'
                content='Are You Sure you want to logout ?'
                actionBtn={handleLogoutClick}
            />
            <div className='container'>
                {userAuthenticated == true ?
                    <div className='heading'>
                        <h5>Welcome <span>{userBio?.firstName} !</span></h5>
                    </div>
                    : null
                }
                <div className='content'>
                    {userAuthenticated === true ? (
                        <div className='left'>
                            <ul className='navigation'>
                                <li>
                                    <button 
                                        onClick={()=> {setActiveIndex('My Profile')}}
                                        className='btn'
                                        style={{borderBottom: activeIndex==='My Profile' ? '1px solid #DB4444':null,}}
                                    >My Profile</button>
                                </li>
                                <li>
                                    <button 
                                        onClick={()=> {setActiveIndex('My Cart')}}
                                        className='btn'
                                        style={{borderBottom: activeIndex==='My Cart' ? '1px solid #DB4444':null,}}
                                    >My Cart</button>
                                </li>
                                <li>
                                    <button onClick={modalState} className='btn'>logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                    <div className='right'>
                        {userAuthenticated == true ? (
                            <div>
                                <MyCart index={activeIndex} />
                                <MyProfile index={activeIndex} />
                            </div>
                        ) : (
                            <div>
                                <h5>Don't have an account ?</h5>
                                <Link to='/sign-up'>
                                    <button className='btn'>Register</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ProfilePage;