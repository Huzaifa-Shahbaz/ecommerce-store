import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductsApi from '../hooks/useProductsApi';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';



const SearchBar = () => {


    const navigate = useNavigate();
    const { data } = useProductsApi('/categories');
    const [dropDownShown, setDropDownShown] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const categories = data;    


    const handleChange = (event)=> {
        setDropDownShown(true)
        const inputVal = event.target.value.toLowerCase();
        setInputValue(inputVal);

        const filteredCategories = categories?.filter((i)=>
            i.category_name.toLowerCase().includes(inputVal)
        )
        setFilteredCategories(filteredCategories);
        setSelectedCategory(null)
    }
    const submit = ()=> {
        navigate('search-results', {state: { selectedCategory, inputValue},});
        setDropDownShown(false);
        setSelectedCategory(null);
    }


    return (
        <div className='search'>
            

            <div className='d-flex search-bar'>
                <input
                    placeholder='Search by categories'
                    onChange={handleChange}
                    value={selectedCategory?.category_name}
                />
                {inputValue === '' ?
                    <button className='btn '>
                        <img src={require('../../assets/icons/search.png')} width={27} />
                    </button>
                    :
                    <button onClick={submit} className='btn'>
                        <img src={require('../../assets/icons/send.png')} width={27} />
                    </button>
                }
            </div>
            {inputValue !== '' ?
                <ul
                    className='drop-down'
                    style={{
                        display: dropDownShown === true ? 'block' : 'none',
                    }}
                >
                    {filteredCategories?.length === 0 ?
                        <p>Search using appropriate keywords</p>
                        :
                        filteredCategories !== null && filteredCategories !== undefined && filteredCategories.length !== 0 && filteredCategories.map((cat)=> {
                            return (
                                <li>
                                    <button onClick={()=> setSelectedCategory(cat)} className='btn'>
                                        {cat.category_name}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul> : null
            }
        </div>
    )
};

export default SearchBar;