import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const Order = ({index, data, setRevenue}) => {

    const tabTitle = 'Orders'
    const [orders, setOrders] = useState(null)

    const TotalRevenue = orders?.reduce((total, item) => {
        return total + (item.orderPayment * 1);
    }, 0);

    useEffect(()=> {
        setOrders(data)
        setRevenue(TotalRevenue)
    }, [data, TotalRevenue])

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
    const footer = `Total :  $${TotalRevenue}`;


    return (
        <div
            className='tab-pane'
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <h4>Orders</h4>
            <div className='data-table'>
                <DataTable value={orders} footer={footer} tableStyle={{ minWidth: '50rem', }}>
                    <Column field={'orderId'} header={'Id'} headerClassName="field" bodyClassName="field"></Column>
                    <Column field={'customerName'} header={'Customer'} bodyClassName="field" headerClassName="field"></Column>
                    <Column body={productsBody} header={'Products'} bodyClassName="field" headerClassName="field"></Column>
                    <Column field={'orderPayment'} header={'Payment'} bodyClassName="field" headerClassName="field"></Column>
                    <Column body={statusBody} header={'Status'} bodyClassName="field" headerClassName="field"></Column>
                </DataTable>
            </div>
        </div>
    )
};

export default Order;