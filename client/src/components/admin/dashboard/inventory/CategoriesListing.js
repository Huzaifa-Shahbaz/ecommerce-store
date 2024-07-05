import React, { useState } from 'react'
import useProductsApi from '../../../../global/hooks/useProductsApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';



function CategoriesListing({selectedCategory, setSelectedCategory}) {
    
    const [categoriesLimit, setCategoriesLimit] = useState(5);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    const {data: categories} = useProductsApi(`/categories?limit=${categoriesLimit}`);
    // const { data: categoriesData, loading } = useProductsApi(`/products/by-category/${selectedCategory?.category_id}`);

    const loadMoreCategories = ()=> {
        const updatedLimit = categoriesLimit + 5
        setCategoriesLimit(updatedLimit)
    }    

    return (
        <div className='categories-tabs'>
            <div onClick={()=> setSelectedCategory(null)} className='tab' style={{background: '#313131', color: 'white',}}>
                <FormatListNumberedRtlIcon sx={{ fontSize: 20 }} />
                <span>All Products</span>
            </div>
            {categories !== null && categories !== undefined && categories?.map((cat, index)=> {
                return (
                    <>
                        <div className='tab-wrapper' key={index}>
                            <div onClick={()=> setSelectedCategory(cat)} className='tab'>{cat.category_name}</div>
                            {index === categories.length - 1 &&
                                <div onClick={loadMoreCategories} className='more-icon'>
                                    <ExpandMoreIcon sx={{ fontSize: 27 }} />
                                </div>
                            }
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default CategoriesListing
