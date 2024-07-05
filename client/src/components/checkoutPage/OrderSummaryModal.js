import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';




const OrderSummaryModal = ({show, onHide, data, }) => {

    const productsBody = (product)=> {
        const jsonArrayFromDatabase = product.items;
        const productsArray = JSON.parse(jsonArrayFromDatabase);
        return (
            <>
                {productsArray.map((i)=> {
                    return (
                        <div className='items-title'>
                            <p>{i.title}</p>
                            <span style={{fontSize: 12,}}> ({ i.quantity ? i.quantity : '1' }) </span>
                        </div>
                    )
                })}
            </>
        )
    }
    const statusBody = (product)=> {
        return (
            <div className={product.status === 'pending' ? 'badge red' : 'badge green'}>
                <p>{product.status}</p>
            </div>
        )
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
                <Modal.Title style={{fontSize: '18px',}}> Your Orders </Modal.Title>
                <ClearIcon onClick={onHide} style={{cursor: 'pointer',}} />
            </Modal.Header>
            <Modal.Body style={{background: '#F4F8FB', padding: '0 50px',}}>
                <div className='data-table'>
                    <DataTable value={data} tableStyle={{ minWidth: '50rem', }}>
                        <Column body={productsBody} header={'Products'} bodyClassName="field" headerClassName="field"></Column>
                        <Column field={'orderPayment'} header={'Payment'} bodyClassName="field" headerClassName="field"></Column>
                        <Column body={statusBody} header={'Status'} bodyClassName="field" headerClassName="field"></Column>
                    </DataTable>
                </div>
            </Modal.Body>
            <Modal.Footer style={{padding: '10px',}}>
                <Button
                    onClick={onHide}
                    variant="info"
                    style={{ padding: '10px 12px', background: '#353535', color: 'white', }}
                >Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default OrderSummaryModal;