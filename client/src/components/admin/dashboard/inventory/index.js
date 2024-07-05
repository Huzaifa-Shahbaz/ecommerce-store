import React, { useState } from 'react';
import useProductsApi from '../../../../global/hooks/useProductsApi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AddNewProduct from './AddNewProduct';
import ProductCard2 from '../../../../global/customComponents/ProductCard2';
import ConfirmationPopUp from '../../../../global/customComponents/ConfirmationPopUp';
import AddNewCategory from './AddNewCategory';
import PrimaryButton from '../../../../global/customComponents/PrimaryButton';
import CategoriesListing from './CategoriesListing';




const Inventory = ({ index }) => {

    const tabTitle = 'Inventory'
    const [productsLimit, setProductsLimit] = useState(4);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const endpoint = selectedCategory === null ? `/products?limit=${productsLimit}` : `/products/by-category/${selectedCategory?.category_id}`;
    const { data: products, loading } = useProductsApi(endpoint);
    const { addProduct } = useProductsApi('/products');
    const { editProduct } = useProductsApi('');
    const { deleteProduct } = useProductsApi('');
    const { addCategory } = useProductsApi('/categories');


    const toggleAddProductModal = () => {
        setShowAddProductModal(!showAddProductModal);
    }
    const toggleCategoryModal = ()=> {
        setShowCategoryModal(!showCategoryModal)
    }
    const handleAddCategory = (category)=> {
        if (category.category_name !== '') {
            addCategory(category)
            setShowCategoryModal(!showCategoryModal)
        } else {
            alert('Add category')
        }
    }

    const handleAddProduct = (prodData) => {
        const formData = new FormData();
        formData.append('title', prodData.title);
        formData.append('description', prodData.description);
        formData.append('price', prodData.price);
        formData.append('thumbnail', prodData.thumbnail);
        formData.append('images', prodData.images);
        formData.append('stock', prodData.stock);
        formData.append('category_id', prodData.category_id);
        formData.append('rating', prodData.rating);
        formData.append('brand', prodData.brand);

        addProduct(formData)

        // setShowAddProductModal(false)
    }

    const handleSaveChanges = (updatedData) => {
        editProduct(`/products/update-product/${updatedData.id}`, updatedData);
        setShowAddProductModal(false);
        setEditMode(false);
        setSelectedProduct(null);
    }
    const handleEditProduct = (prodData) => {
        setEditMode(true)
        setShowAddProductModal(true);
        setSelectedProduct(prodData)
    }
    const toggleConfirmDelete = (proId)=> {
        setSelectedProduct(proId)
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }
    const handleDeleteProduct = () => {
        deleteProduct(`/products/delete-product/${selectedProduct}`)
        setShowDeleteConfirmation(false)
    }
    const viewMoreProducts = ()=> {
        const updateProductsList = productsLimit + 4;
        setProductsLimit(updateProductsList)
    }


    return (
        <div
            className='tab-pane'
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <ConfirmationPopUp
                show={showDeleteConfirmation}
                onHide={toggleConfirmDelete}
                title='Delete'
                content='Are You Sure you want to Delete this Product ?'
                actionBtn={handleDeleteProduct}
            />
            <AddNewProduct
                show={showAddProductModal}
                onHide={toggleAddProductModal}
                onAdd={handleAddProduct}
                onSave={handleSaveChanges}
                setEditMode={setEditMode}
                selectedProduct={editMode === true ? selectedProduct : null}
                setSelectedProduct={setSelectedProduct}
            />
            <AddNewCategory
                show={showCategoryModal}
                onHide={toggleCategoryModal}
                onAdd={handleAddCategory}
            />
            <h4>Inventory</h4>
            <div className='inventory-buttons'>
                <button onClick={()=> setShowAddProductModal(true)} className='btn btn-add' >
                    Add New Product
                    <AddCircleIcon sx={{ fontSize: 20, marginLeft: 2, }} />
                </button>
                <button onClick={()=> setShowCategoryModal(true)} className='btn btn-add' >
                    Add New Category
                    <CategoryIcon sx={{ fontSize: 22, marginLeft: 2, }} />
                </button>
            </div>
            <div className='products'>
                <div style={{display: 'flex', gap: 5,}}>
                    <h5>Products</h5> <span>({products?.length})</span>
                </div>
                <CategoriesListing
                    setSelectedCategory={setSelectedCategory}
                />
                <div className='cards-wrapper'>
                    {products?.length === 0 ?
                        <p>No products</p>
                        :
                        products !== null && products !== undefined && products.length > 0 &&
                            products?.map((item) => {
                                return (
                                    <ProductCard2
                                        contentLoading={loading === true ? loading : null}
                                        data={item}
                                        onEdit={handleEditProduct}
                                        onDelete={toggleConfirmDelete}
                                    />
                                )
                            }
                        )
                    }
                </div>
                <div onClick={viewMoreProducts} className='btn-wrapper'>
                    <PrimaryButton label='View More' />
                </div>
            </div>
        </div>
    )
};

export default Inventory;