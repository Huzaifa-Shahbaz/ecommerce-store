import React, { useRef, useState } from 'react';
import SectionHeading from '../../../global/customComponents/SectionHeading';
import { Swiper, SwiperSlide } from 'swiper/react';
import EastIcon from '@mui/icons-material/East';
import useProductsApi from '../../../global/hooks/useProductsApi';
import ProductCard from '../../../global/customComponents/ProductCard';



const Categories = () => {
    
    const {data: categories} = useProductsApi('/categories');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data: categoriesData, loading } = useProductsApi(`/products/by-category/${selectedCategory?.category_id}`);

    const swiperRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [slidesEnd, setSlidesEnd] = useState(null);


    const prevSlide = ()=> {
        if (swiperInstance) {
            swiperInstance.slidePrev();
            setSlidesEnd(false);
        }
    }
    const nextSlide = ()=> {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }

    return (
        <section className='categories'>
            <div className='container'>
                <div className='d-flex'>
                    <SectionHeading title='Categories' heading='Browse By Category' />
                    <div className='slider-navigation-buttons'>
                        <EastIcon onClick={prevSlide} className='btn navigate prev' />
                        <EastIcon
                            onClick={nextSlide}
                            className='btn navigate'
                            style={{
                                background: slidesEnd == true ? null : '#f8f8f8',
                                color: slidesEnd == true ? '#dddd' : '#7c7c7c',
                            }}
                        />
                    </div>
                </div>
                <div className='nav nav-tabs' id="nav-tab">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        ref={swiperRef}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        onReachEnd={() => setSlidesEnd(true)}
                        breakpoints={{
                            1180: {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                            842: {
                                slidesPerView: 4,
                            },
                            600: {
                                slidesPerView: 3,
                            },
                            330: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {categories !== null && categories !== undefined && categories.length !== 0 && categories.map((i)=> {
                            return (
                                <SwiperSlide>
                                    <button
                                        className="category-link"
                                        onClick={()=> setSelectedCategory(i)}
                                    >
                                        <figure className='icon-holder'>
                                            <img src={require(`../../../assets/icons/categoriesIcons/${i.category_name}.png`)} alt='icon' width={50} height={50} />
                                        </figure>
                                        <p>{i.category_name}</p>
                                    </button>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='categories-data'>
                    <h4>{selectedCategory?.category_name}</h4>
                    {selectedCategory === null ?
                        <p>Select a category</p>
                        :
                        <div className='cards-wrapper'>
                            {categoriesData?.length === 0 ?
                                <p>No products</p>
                                :
                                categoriesData !== null && categoriesData !== undefined && categoriesData.length > 0 &&
                                    categoriesData?.map((item) => {
                                        return (
                                            <ProductCard
                                                contentLoading={loading === true ? loading : null}
                                                data={item}
                                            />
                                        )
                                    }
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    )
};

export default Categories;