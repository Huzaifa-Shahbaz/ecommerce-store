import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



function AddNewCategory({show, onAdd, onHide}) {
    
    const [categoryData, setCategoryData] = useState({
        category_name: '',
    })

    const handleInputChange = (event)=> {
        setCategoryData({
            ...categoryData,
            category_name: event.target.value,
        })
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize: '18px',}} >Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{fontSize: 15, fontWeight: 500,}}>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="eg: laptops, smartphones...."
                            className='category-input'
                            name='categoryName'
                            value={categoryData.category_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={()=> onAdd(categoryData)}
                    variant="info"
                    style={{ padding: '10px 20px', background: '#498bee', border: '1px solid #498bee', marginRight: '10px', borderRadius: '20px', color: 'white', }}
                > Add </Button>
                <Button 
                    onClick={onHide}
                    variant="info"
                    style={{ padding: '10px 12px', background: '#353535', color: 'white', }}
                > Cancel </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNewCategory
