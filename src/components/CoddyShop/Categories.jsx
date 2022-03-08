import React from 'react';
import CatItem from './CatItem';
import { useSelector } from 'react-redux';





const Categories = () => {
    let state = useSelector(store => store.reducer.category)
    console.log(state)
    return (
        <nav className="categories">
            <div className="categories_wrapper">
                <ul>
                {state.map(el => <CatItem key = {el.id} name = {el.name} id = {el.id}/>)}
                </ul>
            </div>
        </nav>
    );
};



export default Categories;