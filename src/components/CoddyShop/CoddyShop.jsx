import React from 'react';
import DecorHeader from '../../utils/decor-header/DecorHeader';
import Categories from './Categories';
import "./coddyShop.scss"
import TopShop from "./TopShop"
import SaleList from "./SaleList"



const CoddyShop = () => {
    return (
        <div className='coddyShop' id={"coddy-shop"}>
            <DecorHeader text="Coddy <Shop/>"/>
            <section>
                <TopShop/>
                <Categories/>
                <SaleList/>
            </section>
        </div>
    );
};



export default CoddyShop;