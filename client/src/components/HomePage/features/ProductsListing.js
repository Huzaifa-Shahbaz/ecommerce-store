import React from 'react';
import PrimaryButton from '../../../global/customComponents/PrimaryButton';
import ProductCard from '../../../global/customComponents/ProductCard';
import { Link } from 'react-router-dom';
import useProductsApi from '../../../global/hooks/useProductsApi';
import SectionHeading from '../../../global/customComponents/SectionHeading';
import Loader from '../../../global/customComponents/Loader';



const ProductsListing = () => {

    // const {data, loading,} = useProductsApi('https://dummyjson.com/products?limit=8');
    const {data, loading} = useProductsApi(`/products?limit=${8}`);


    return (
        <section className='products-listing' id='products_listing'>
            <div className='container'>
                <SectionHeading title='Products' heading='Explore Our Products' />
                {loading == true ? 
                    <Loader />
                    :
                    <>
                        <div className='cards-wrapper'>
                            {data !== null && data !== undefined && data.length > 0 &&
                                data?.map((item) => {
                                    return (
                                        <ProductCard
                                            contentLoading={loading === true ? loading : null}
                                            data={item}
                                        />
                                    )
                                }
                            )}
                        </div>
                        <div className='btn-wrapper'>
                            <Link to='store-page'>
                                <PrimaryButton label='View All Products' />
                            </Link>
                        </div>
                    </>
                }
            </div>
        </section>
    )
};

export default ProductsListing;