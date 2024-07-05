import React from 'react';
import icon from '../assets/icons/customer-support.png';


const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='grid'>
                    <div className='links'>
                        <h4>Account</h4>
                        <ul>
                            <li><a>My Account</a></li>
                            <li><a>Login/Register</a></li>
                            <li><a>Cart</a></li>
                            <li><a>Whishlist</a></li>
                        </ul>
                    </div>                    
                    <div className='links'>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a>Privacy Policy</a></li>
                            <li><a>Terms of Use</a></li>
                            <li><a>FAQ</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <div className='links'>
                        <h4>Customer Support</h4>
                        <ul>
                            <li>
                                <a>
                                    <img src={icon} width={65} />
                                </a>
                            </li>
                            <li><a>reyehef242@hgzk.com</a></li>                            
                            <li><a>+88015-88888-9999</a></li>
                        </ul>
                    </div>
                    <div className='links'>
                        <h4>Register</h4>
                        <ul>
                            <li><p>Subscribe</p></li>
                            <li><p>Get 10% off at your first order</p></li>
                            <li>
                                <input placeholder='Enter Your email' />
                            </li>                            
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;