import React from 'react';
import { useLocation } from 'react-router-dom';
import useProductsApi from '../global/hooks/useProductsApi';
import ProductCard from '../global/customComponents/ProductCard';


const SearchResults = () => {

    const { state } = useLocation();
    const categoryId = state?.selectedCategory?.category_id;
    const categoryName = state?.selectedCategory?.category_name ? state.selectedCategory.category_name : state?.inputValue;
    const { data, loading } = useProductsApi(`/products/by-category/${categoryId}`);


    return (
        <section className='search-results'>
            <div className='container'>
                <h4>Search Results for :
                    <span> "{categoryName}"</span>
                </h4>
                {!(data === null || data === undefined || data.length > 0) ?
                    <div className='result-not-found'>
                        <figure className='err-image'>
                            <img src={require('../assets/images/no-result-found.png')} />
                        </figure>
                        <p>Result not found !</p>
                    </div>
                    :
                    <div className='cards-wrapper'>
                        {data?.map((item) => {
                            return (
                                <ProductCard
                                    contentLoading={loading === true ? loading : null}
                                    data={item}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </section>
    )
};

export default SearchResults;