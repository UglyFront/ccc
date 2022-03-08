import React from 'react';
import './header.scss'
import logo from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom';
import burgerIcon from "../../assets/images/burger.svg"
import { useState } from 'react';
import MyModal from '../../utils/modal-window/MyModal';
import { HashLink as MyLink } from "react-router-hash-link";

const HomePage = () => {

    const [menuFlag, setMenuFlag] = useState(false);


    return (
        <header id='header' className='header'>
            <nav className='header-nav'>

                <Link to="/"><img className='logo' src={logo} alt="logo" /> </Link>



                <ul className=" header__menu">
                    <li><Link to="/" className='header__menu__link'>Главная</Link></li>
                    <li><Link to="/blog" className='header__menu__link'>Блог</Link></li>
                    <li><MyLink className='header__menu__link' to="/#coddy-shop">Магазин</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#courses">Курсы</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#schedule">Расписание</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#contacts">Информация о нас</MyLink></li>
                </ul>

                <MyModal isActive={menuFlag} setActive={setMenuFlag}>
                    <ul className="my-modal-header__menu header__menu">
                    <li><Link to="/" className='header__menu__link'>Главная</Link></li>
                    <li><Link to="/blog" className='header__menu__link'>Блог</Link></li>
                    <li><MyLink className='header__menu__link' to="/#coddy-shop">Магазин</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#courses">Курсы</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#schedule">Расписание</MyLink></li>
                    <li><MyLink className='header__menu__link' to="/#contacts">Информация о нас</MyLink></li>
                    </ul>
                </MyModal>

                <img
                    className='burger'
                    onClick={() => setMenuFlag(!menuFlag)}
                    src={burgerIcon}
                    alt="burgerIcon" />


            </nav>
            <div className="city">{"<Mikhaylovsk>"}</div>
        </header>
    );
};

export default HomePage;