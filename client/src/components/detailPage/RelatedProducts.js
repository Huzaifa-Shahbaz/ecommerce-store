import React from 'react';
import useProductsApi from '../../global/hooks/useProductsApi';
import ProductCard from '../../global/customComponents/ProductCard';
import SectionHeading from '../../global/customComponents/SectionHeading';



const RelatedProducts = ({url}) => {
    const { data, loading } = useProductsApi(`/products/by-category/${url}`);


    return (
        <section className='related-products'>
            <SectionHeading title='Related Items' />
            <div className='cards-wrapper'>
                {data?.length === 0 ? 
                    <p>No related items found !</p>
                    :
                    data !== null && data !== undefined && data.length > 0 && data?.map((item) => {
                        return (
                            <ProductCard
                                contentLoading={loading === true ? loading : null}
                                data={item}
                            />
                        )}
                    )
                }
            </div>
        </section>
    )
};

export default RelatedProducts;