import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, stateSelector, favMenu, } from '../../redux/slices/favSlice';
import SideBarCard from './SideBarCard';
import emptyListIcon from '../../assets/icons/list-icon.png';
import EmptySideMenu from './EmptySideMenu';



const FavouritesList = () => {

    const menuState = useSelector(stateSelector);
    const favItems = useSelector(dataSelector);
    const dispatch = useDispatch();
            

    return (
        <section className={menuState === true ? "side-bar open" : "side-bar"}>
            <header className='d-flex header'>
                <h5>Favourites</h5>
                <button onClick={() => dispatch(favMenu({menuState: false}))} className='btn icon'>X</button>
            </header>
            <div className='items'>
                {favItems.length === 0 ?
                    <EmptySideMenu 
                        icon={emptyListIcon}
                        text="Looks like you don't have saved items !" 
                    />
                    :
                    favItems !== '' && favItems !== undefined && favItems.length > 0 && favItems.map((item) => {
                        return (
                            <SideBarCard
                                data={item}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
};

export default FavouritesList;