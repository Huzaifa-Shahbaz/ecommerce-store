import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ClearIcon from '@mui/icons-material/Clear';
import placeholderImage from '../../../../assets/images/placeholder-image.webp';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useProductsApi from '../../../../global/hooks/useProductsApi';



const AddNewProduct = ({show, onHide, setEditMode, selectedProduct, setSelectedProduct, onAdd, onSave}) => {

    const { data: categories } = useProductsApi('/categories');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [editable, setEditable] = useState(false);
    const formRef = useRef(null);
    

    const handleInputChange = (event)=> {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
        if (selectedProduct) {
            setEditable(true)
        }
    };

    const handleImageClick = () => {
        document.getElementById('thumbnailInput').click();
    };
    
    const imagesArray = [
        // "https://cdn.dummyjson.com/product-images/11/1.jpg",
        // "https://cdn.dummyjson.com/product-images/11/2.jpg",
        // "https://cdn.dummyjson.com/product-images/11/3.jpg",
        // "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg"
    ]
    const jsonImages = JSON.stringify(imagesArray)

    const data = {
        title: '',
        description: '',
        price: '',
        thumbnail: null,
        images: jsonImages,
        stock: '',
        category_id: selectedCategory,
        rating: '4' || '',
        brand: '',
    }
    const [formData, setFormData] = useState(data)    


    const handleFileChange = (event) => {
        setThumbnailImage(event.target.files[0]);
    };

    const handleCategory = (event) => {
        setSelectedCategory(event.target.value);
        setFormData({
            ...formData,
            category_id: event.target.value,
        });
    };


    useEffect(()=> {
        if(thumbnailImage !== null) {
            setFormData((prevData) => ({
                ...prevData,
                thumbnail: thumbnailImage
            }));
        }
        if(selectedProduct) {
            setFormData(selectedProduct)
        }
        setThumbnailImage(thumbnailImage)
    }, [selectedProduct, thumbnailImage])

    const onClose = ()=> {
        onHide()
        setFormData(data)
        setThumbnailImage(null)
        setEditMode(false)
        setEditable(false)
        setSelectedProduct(null)
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            dialogClassName="my-modal"
        >
            <Modal.Header className='d-flex' >
                <Modal.Title style={{fontSize: '18px',}}> { selectedProduct ? 'Edit Product' : 'Add Product'} </Modal.Title>
                <ClearIcon onClick={onClose} style={{cursor: 'pointer',}} />
            </Modal.Header>
            <Modal.Body style={{background: '#F4F8FB', padding: '0 50px',}}>
                <section className='details'>
                    <form 
                        ref={formRef}
                        method='POST'
                        encType='multipart/form-data'
                        className='product-details'
                        style={{padding: 0,}}
                    >
                        <div className='left'>
                            <div className='images'>
                                <div className='vertical'>
                                    <Swiper
                                        slidesPerView={3}
                                        breakpoints={{
                                            500: {
                                                direction: 'vertical',
                                                slidesPerView: 4,
                                            },
                                            400: {
                                                direction: 'horizontal',
                                                slidesPerView: 4,
                                            },
                                        }}
                                    >
                                        <SwiperSlide>
                                            <div className='image-holder'>
                                                <img src={require('../../../../assets/images/banner-image2.jpg')} />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='image-holder'>
                                                <img src={require('../../../../assets/images/banner-image1.jpg')} />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='image-holder'>
                                                <img src={require
                                                    ('../../../../assets/images/side-image.jpg')} />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='image-holder'>
                                                <img src={require('../../../../assets/images/banner-image2.jpg')} />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='image-holder'>
                                                <img src={require
                                                    ('../../../../assets/images/side-image.jpg')} />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className='image-holder thumbnail'>
                                    <input
                                        name='thumbnail'
                                        value={data.thumbnail}
                                        onChange={handleFileChange}
                                        type='file'
                                        id="thumbnailInput"
                                        style={{ display: 'none' }}
                                    />
                                    <img
                                        src={thumbnailImage ? URL.createObjectURL(thumbnailImage) : placeholderImage}
                                        onClick={handleImageClick}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='description'>
                                <div className='input-wrapper'>
                                    <h6>Product Name:</h6>
                                    <input 
                                        name='title'
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder='Title'
                                    />
                                </div>
                                <div className='input-wrapper'>
                                    <h6>Description:</h6>
                                    <textarea
                                        name='description'
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder='Description'
                                        className='prod-details'
                                    />
                                </div>
                                <div className='input-wrapper'>
                                    <h6>Brand:</h6>
                                    <input 
                                        name='brand'
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        placeholder='Brand'
                                    />
                                </div>
                                <div className='input-wrapper'>
                                    <h6>Category:</h6>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedCategory}
                                            onChange={handleCategory}
                                        >
                                            {categories !== null && categories !== undefined && categories?.map((i)=> {
                                                return (
                                                    <MenuItem value={i.category_id}> {i.category_name} </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='d-flex' style={{gap: 15,}}>
                                    <div className='input-wrapper'>
                                        <h6>Price:</h6>
                                        <input
                                            name='price'
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder='Price'
                                        />
                                    </div>
                                    <div className='input-wrapper'>
                                        <h6>Stock:</h6>
                                        <input
                                            name='stock'
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            placeholder='Stock'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </Modal.Body>
            <Modal.Footer style={{padding: '10px',}}>
                <Button
                    onClick={()=> onAdd(formData)}
                    variant="info"
                    style={{ display: selectedProduct ? 'none' : 'block', padding: '10px 20px', background: '#498bee', border: '1px solid #498bee', marginRight: '10px', borderRadius: '20px', color: 'white', }}
                > Upload </Button>
                {editable === true ?
                    <Button
                        onClick={()=> onSave(formData)}
                        variant="info"
                        style={{ padding: '10px 20px',  background: '#498bee',  border: '1px solid #498bee',  marginRight: '10px', borderRadius: '20px',  color: 'white', }}
                    > Save Changes </Button> : null
                }
                <Button
                    onClick={onClose}
                    variant="info"
                    style={{ padding: '10px 12px', background: '#353535', color: 'white', }}
                >Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default AddNewProduct;