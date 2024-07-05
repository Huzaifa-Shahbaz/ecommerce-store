import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ConfirmationPopUp = ({show, onHide, title, content, actionBtn}) => {


    return (
        <Modal
            className='pop-up'
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize: '18px',}}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: '16px', padding: '25px 10px',}}> {content} </Modal.Body>
            <Modal.Footer style={{padding: '10px',}}>
                <div className='buttons'>
                    <Button
                        onClick={actionBtn}
                        variant="primary"
                        style={{ padding: '10px 20px', border: '1px solid #DB4444', marginRight: '10px', borderRadius: '6px', }}
                    >{title}</Button>
                    <Button
                        onClick={onHide}
                        variant="info"
                        style={{ padding: '10px 12px', background: '#353535', color: 'white', }}
                    >No</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmationPopUp;