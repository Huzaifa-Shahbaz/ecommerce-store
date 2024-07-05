import { useEffect, useState } from 'react';
import Loader from '../../global/customComponents/Loader';
import ProductCard from '../../global/customComponents/ProductCard';
import SectionHeading from '../../global/customComponents/SectionHeading';
import PriceFilter from './PriceFilter';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import useProductsApi from '../../global/hooks/useProductsApi';




const Store = () => {
    
    const [productsLimit, setProductsLimit] = useState(4);
    const {data, loading} = useProductsApi(`/products?limit=${productsLimit}`);

    const [filterActive, setFilterActive] = useState(false)
    const [activeIndex, setActiveIndex] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(()=> {
        if(data) {
            setFilteredProducts(data)
        }
    }, [data])


    const viewMoreProducts = ()=> {
        const updateProductsList = productsLimit + 2;
        setProductsLimit(updateProductsList)
    }

    const handlePriceChange = (event) => {
        const selectedPrice = parseInt(event.target.value);
        setMinPrice(selectedPrice);
    };


    const onApplyFilter = ()=> {
        const newFilteredProducts = data?.filter(
            // filter for minPrice
            (product)=> product.price <= minPrice
        );
        setFilteredProducts(newFilteredProducts)
        setActiveIndex(!activeIndex)
        setFilterActive(true)
    }

    const resetFilter = ()=> {
        setFilteredProducts(data);
        setMinPrice(0);
        setMaxPrice(1000);
        setFilterActive(false);
    }


    return (
        <section className='products'>
            <div className='container'>
                <div className='d-flex'>
                    <SectionHeading title='Products' />
                    <div className='d-flex widgets'>
                        <div className='d-flex price-filter'>
                            {filterActive === true ?
                                <button onClick={resetFilter} className='btn remove'>
                                    <span>Remove Filter</span> <img src={require('../../assets/icons/cross.png')} width={15} />
                                </button> : null
                            }
                            <PriceFilter
                                onPress={()=> setActiveIndex(!activeIndex)}
                                toggle={activeIndex}
                                minPrice={0}
                                maxPrice={1000}
                                onChange={handlePriceChange}
                                FilterProducts={onApplyFilter}
                            />
                            {filterActive == true ? <span> Maximum Price : ${minPrice}</span> : null}
                        </div>
                    </div>
                </div>
                {loading == true ?
                    <Loader />
                    :
                    <>
                        <div className='cards-wrapper'>
                            {filteredProducts !== null && filteredProducts !== undefined && filteredProducts.length > 0 &&
                                filteredProducts?.map((item) => {
                                    return (
                                        <ProductCard
                                            contentLoading={loading === true ? true : null}
                                            data={item}
                                        />
                                    )
                                }
                            )}
                        </div>
                        <div onClick={viewMoreProducts} className='btn-wrapper'>
                            <PrimaryButton label='View More' />
                        </div>
                    </>
                }
            </div>
        </section>
    )
};

export default Store;