import React, { useEffect, useState } from 'react';
import siteLogo from '../../../assets/svgIcons/logo.svg';
import Home from './Home';
import Orders from './Orders';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Inventory from './inventory/index';
import LogoutIcon from '@mui/icons-material/Logout';
import useUsersApi from '../../../global/hooks/useUsersApi';
import Users from './Users';
import useProductsApi from '../../../global/hooks/useProductsApi';
import ConfirmationPopUp from '../../../global/customComponents/ConfirmationPopUp';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../redux/slices/adminAuthSlice';



const ClientDashboard = () => {

    const [sideMenu, setSideMenu] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [activeIndex, setActiveIndex] = useState('Home')
    // const {data: products} = useProductsApi(`https://dummyjson.com/products?limit=100`);
    const {data: products} = useProductsApi('/products');
    const { users } = useUsersApi('/users');    
    const { data: orders } = useProductsApi('/orders')
    const [revenue, setRevenue] = useState(null);    
    const dispatch = useDispatch();
    

    const menuToggler = ()=> {
        setSideMenu(!sideMenu)
    }
    const modalState = ()=> {
        setShowPopUp(!showPopUp)
        menuToggler()
    }
    const handleLogout = ()=> {
        dispatch(adminLogout())
        modalState()
    }

    return (
        <div className='dashboard'>
            <ConfirmationPopUp
                show={showPopUp}
                onHide={modalState}
                title='Logout !'
                content='Are You Sure you want to Log Out ?'
                actionBtn={handleLogout}
            />
            <main className='layout'>
                <div
                    className='menu'
                    style={{
                        display: sideMenu === true ? 'block' : null,
                    }}
                >
                    <h4 className='d-flex head'>
                        <div className='logo'>
                            <img src={siteLogo} width={70} />
                            <a>HomeGadgetry</a>
                        </div>
                        {sideMenu === true ?
                            <div
                                className='btn icon cross-icon'
                                onClick={menuToggler}
                            >
                                <img src={require('../../../assets/icons/cross.png')} width={18} />
                            </div> : null
                        }
                    </h4>
                    <ul className='navigation'>
                        <li
                            onClick={()=> setActiveIndex('Home')}
                            style={{
                                background: activeIndex==='Home' ? '#F4F8FB' : null,
                            }}
                        >
                            <a>
                                <HomeIcon />
                                <span>Home</span>
                            </a>
                        </li>
                        <li
                            onClick={()=> setActiveIndex('Inventory')}
                            style={{
                                background: activeIndex==='Inventory' ? '#F4F8FB' : null,
                            }}
                        >
                            <a>
                                <Inventory2Icon />
                                <span>Inventory</span>
                            </a>
                        </li>
                        <li
                            onClick={()=> setActiveIndex('Users')}
                            style={{
                                background: activeIndex==='Users' ? '#F4F8FB' : null,
                            }}
                        >
                            <a>
                                <PeopleOutlineIcon sx={{ fontSize: 30 }} />
                                <span>Users</span>
                            </a>
                        </li>
                        <li 
                            onClick={()=> setActiveIndex('Orders')}
                            style={{
                                background: activeIndex==='Orders' ? '#F4F8FB' : null,
                            }}
                        >
                            <a>
                                <FormatListBulletedIcon />                            
                                <span>Orders</span>
                            </a>
                        </li>
                        <li
                            onClick={modalState}
                        >
                            <a className='btn'>
                                <LogoutIcon />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='main'>
                    <header className='d-flex'>
                        <p>header</p>
                        <div
                            className='btn icon menu-icon' 
                            onClick={menuToggler}
                            style={{padding: 0, display: 'none',}}
                        >
                            {sideMenu === false ? <img src={require('../../../assets/icons/menu.png')} height={27} width={35} /> : null }
                        </div>
                    </header>
                    <div className='tab-panel'>
                        <Home
                            index={activeIndex}
                            usersLength={users?.length}
                            ordersLength={orders?.length}
                            productsLength={products?.length}
                            revenue={revenue}
                        />
                        <Inventory index={activeIndex} />
                        <Users
                            index={activeIndex}
                            data={users}
                        />
                        <Orders
                            index={activeIndex}
                            data={orders}
                            setRevenue={setRevenue}
                        />
                        
                        {/* {activeIndex === 'Home' &&
                            <Home
                                index={activeIndex}
                                usersLength={users?.length}
                                ordersLength={orders?.length}
                                productsLength={products?.length}
                                revenue={revenue}
                            />
                        }
                        {activeIndex === 'Inventory' &&
                            <Inventory index={activeIndex} />
                        }
                        {activeIndex === 'Users' &&
                            <Users
                                index={activeIndex}
                                data={users}
                            />
                        }
                        {activeIndex === 'Orders' &&
                            <Orders
                                index={activeIndex}
                                data={orders}
                                setRevenue={setRevenue}
                            />
                        } */}
                    </div>
                </div>
            </main>
        </div>
    )
};

export default ClientDashboard;