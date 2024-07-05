import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ConfirmationPopUp from '../../../global/customComponents/ConfirmationPopUp';
import useUsersApi from '../../../global/hooks/useUsersApi';



const Users = ({index, data}) => {


    const [selectedUserId, setSelectedUserid] = useState(null);
    const { fetchUsers, deleteUser } = useUsersApi('/users');
    const tabTitle = 'Users'
    const [showPopUp, setShowPopUp] = useState(false);
    const [userData, setUserData]= useState(null);

    useEffect(()=> {
        setUserData(data)
        fetchUsers()
    }, [data])


    const modalState = (userId)=> {
        setSelectedUserid(userId)
        setShowPopUp(!showPopUp)
    }
    const deleteBtn = (user)=> {
        return (
            <button onClick={()=> modalState(user.id)} className='btn delete'>Delete</button>
        )
    }
    const handleDeleteUser = ()=> {
        deleteUser(`/delete-user/${selectedUserId}`)
        setUserData(data)
        modalState(!showPopUp)
    }


    return (
        <div
            className='tab-pane'
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <ConfirmationPopUp
                show={showPopUp}
                onHide={modalState}
                title='Delete'
                content='Are You Sure you want to Delete this user ?'
                actionBtn={handleDeleteUser}
            />
            <h4>Users</h4>
            <div className='data-table'>
                <DataTable value={userData} tableStyle={{ minWidth: '50rem', }}>
                    <Column field={'id'} header={'Id'} headerClassName="field" bodyClassName="field"></Column>
                    <Column field={'firstName'} header={'Name'} headerClassName="field" bodyClassName="field"></Column>
                    <Column field={'email'} header={'Email'} headerClassName="field" bodyClassName="field"></Column>
                    <Column field={'password'} header={'password'} headerClassName="field" bodyClassName="field"></Column>
                    <Column body={deleteBtn} header={'Delete User'} headerClassName="field" bodyClassName="field"></Column>
                </DataTable>
            </div>

        </div>
    )
};

export default Users;