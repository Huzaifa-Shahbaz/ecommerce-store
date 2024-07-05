import React, { useState } from 'react';
import siteLogo from '../assets/svgIcons/logo.svg';
import bookmark from '../assets/icons/bookmark.png';
import cartIcon from '../assets/icons/shopping-cart.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, favMenu } from '../redux/slices/favSlice';
import { cartItemsSelector } from '../redux/slices/cartSlice'
import SearchBar from '../global/customComponents/SearchBar';



const Header = () => {    

    const [menuToggle, setMenuToggle] = useState(false);

    const dispatch = useDispatch();
    const favItems = useSelector(dataSelector);
    const cartItems = useSelector(cartItemsSelector)
    

    const menuToggler = ()=> {
        setMenuToggle(!menuToggle)
    }


    return (
        <header className="site-header">
            <div className='container'
                style={{
                    height: menuToggle === false ? null :  '400px',
                    position: 'relative',
                }}
            >
                <h3 className='d-flex logo'
                    style={{
                        position: menuToggle==false ? null : 'absolute',
                        top: menuToggle==false ? null : 0,
                    }}
                >
                    <img src={siteLogo} width={70} />
                    <a>HomeGadgetry</a>
                </h3>
                <nav className={menuToggle == false ? 'd-flex navigation' : 'navigation-small'}>
                    <Link to='/'>Home</Link>
                    <Link to='/store-page'>Store</Link>
                    <a>Contact us</a>
                    <Link to='sign-up' >Sign Up</Link>
                    {menuToggle === true ?
                        <Link to='/profile-page' >Account</Link> : null
                    }
                </nav>
                <SearchBar />
                <div className='d-flex buttons'>
                    <button className='btn icon' onClick={()=> dispatch(favMenu({menuState: true,}))}>
                        {favItems.length !== 0 ?
                            <span className='counter'>{favItems.length}</span> : null
                        }
                        <img src={bookmark} width={27} alt='bookmark'/>
                    </button>
                    <Link to='cart-page' >
                        <button className='btn icon'>
                            {cartItems.length !== 0 ?
                                <span className='counter'>{cartItems.length}</span> : null
                            }
                            <img src={cartIcon} width={39} height={37} alt='cart'/>
                        </button>
                    </Link>
                    <Link to='/profile-page'>
                        <button className='btn profile-icon'>
                            <img src={require('../assets/icons/profile.png')} width={38} />
                        </button>
                    </Link>
                    <div
                        className='btn icon menu-icon'
                        onClick={menuToggler}
                        style={{
                            position: menuToggle==false ? null : 'absolute',
                            top: menuToggle==false ? null : '10px',
                            right: menuToggle==false ? null : '50px',
                        }}
                    >
                        {menuToggle === false ?
                            <img src={require('../assets/icons/menu.png')} width={35} />
                            :
                            <img src={require('../assets/icons/cross.png')} width={22} />
                        }
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;