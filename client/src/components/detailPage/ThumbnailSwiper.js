import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';




const ThumbnailSwiper = ({images}) => {

    const [swiperImages, setSwiperImages] = useState(images)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const staticImages = [
        'no-image.png',
        'no-image-2.png',
        'no-image-3.png',
    ]


    useEffect(()=> {
        if (swiperImages.length === 0) {
            setSwiperImages(staticImages)
        }
    }, [])


    return (
        <div className='thumbs-swiper'>
            <Swiper
                slidesPerView={4}
                spaceBetween={40}
                modules={[Thumbs]}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                className='swiper-gallery'
                breakpoints={{
                    768: {
                        direction: 'vertical',
                        slidesPerView: 3,
                    },
                }}
            >
                {swiperImages?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <figure className='image-holder small'>
                            {image.includes('.png') ?
                                <img src={require('../../assets/images/' + image)} />
                                :
                                <img src={image} />
                            }
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {swiperImages?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <figure className='image-holder thumbnail'>
                            {img.includes('.png') ?
                                <img src={require('../../assets/images/' + img)} />
                                :
                                <img src={img} />
                            }
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
};

export default ThumbnailSwiper;