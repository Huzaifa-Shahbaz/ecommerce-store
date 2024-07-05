import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function OrderConfirmedPopUp({ show, onHide, trackingId }) {

    return (
        <Modal 
            show={show} 
            onHide={onHide}
        >
            <Modal.Header style={{borderBottom:'0',}} closeButton></Modal.Header>
            <Modal.Body>
                <div className='order-confirmation'>
                    <img src={require('../../assets/icons/order-confirmed.png')} />
                    <p>Your Order has been placed !</p>
                    <p> your order Tracking id is: <span>{trackingId}</span> </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderConfirmedPopUp
