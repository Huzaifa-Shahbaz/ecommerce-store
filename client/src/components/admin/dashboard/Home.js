import React, { useState } from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import GroupIcon from '@mui/icons-material/Group';
import CountUp from 'react-countup';
import { PieChart } from '@mui/x-charts/PieChart'
import Statistics from './Statistics';



const Home = ({ index, usersLength, ordersLength, productsLength, revenue}) => {

    const tabTitle = 'Home'
    

    return (
        <div
            className='tab-pane'
            style={{
                display: tabTitle === index ? 'block' : 'none',
            }}
        >
            <h3>Welcome !</h3>
            <div className='cards'>
                <div className='card'>
                    <p>Orders</p>
                    <div className='d-flex'>
                        <h5>
                            <CountUp
                                end={ordersLength}
                            />
                        </h5>
                        <p>
                            <ShoppingBagIcon fontSize="large" />
                        </p>
                    </div>
                </div>
                <div className='card'>
                    <p>Registered Users</p>
                    <div className='d-flex'>
                        <h5>
                            <CountUp
                                end={usersLength}
                            />
                        </h5>
                        <p>
                            <GroupIcon fontSize="large" />
                        </p>
                    </div>
                </div>
                <div className='card'>
                    <p>Revenue</p>
                    <div className='d-flex'>
                        <h5>
                            <CountUp
                                end={revenue}
                            />
                        </h5>
                        <p>
                            <EuroSymbolIcon fontSize="large" />
                        </p>
                    </div>
                </div>
                <div className='card'>
                    <p>Products</p>
                    <div className='d-flex'>
                        <h5>
                            <CountUp
                                end={productsLength}
                            />
                        </h5>
                        <p>
                            <ShoppingCartCheckoutIcon fontSize="large" />
                        </p>
                    </div>
                </div>
            </div>
            <div className='graphs'>
                <div className='box bar-chart'>
                    <Statistics />           
                </div>
                <div className='box pie-chart'>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                innerRadius: 30,
                                startAngle: -180,
                                endAngle: 180,
                                cx: 140,
                                cy: 150,
                            }
                        ]}
                        width={280}
                        height={285}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default Home;