import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PrimaryButton from '../../../global/customComponents/PrimaryButton';
import bannerImg1 from '../../../assets/images/banner-image1.jpg'
import bannerImg2 from '../../../assets/images/banner-image2.jpg'


const Banner = () => {
    return (
        <section className='banner'>            
            <figure className='banner-image'>
                <img src={bannerImg1} />
            </figure>
            <div className='container banner-content'>
                <h1>HomeGadgetry</h1>
                <h3>Empowering Your Shopping Experience, One Click at a Time! </h3>
                <a href='#products_listing'>
                    <PrimaryButton label='Explore' />
                </a>                    
            </div>            
        </section>
    )
};

export default Banner;