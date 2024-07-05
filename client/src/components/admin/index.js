import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import ClientDashboard from './dashboard';
import { selectIsAuthenticated } from '../../redux/slices/adminAuthSlice';
import { useSelector } from 'react-redux';



const AdminRoutes = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated)
    const [switchRoute, setSwitchRoute] = useState(false);


    useEffect(()=> {
        if(isAuthenticated === true) {
            setSwitchRoute(true)
        }
    }, [isAuthenticated])

    return (
        <>
            {switchRoute === true ?
                <ClientDashboard />
                :
                <LoginPage />
            }
        </>
    )
};

export default AdminRoutes;