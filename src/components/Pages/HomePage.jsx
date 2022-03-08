import React from 'react';
import News from '../news/News';
import Courses from '../courses/Courses';
import DecorLine from '../../utils/decor-line/DecorLine';
import CoddyShop from '../CoddyShop/CoddyShop';
import Schedule from '../schedule/Schedule';
import CoddyContacts from '../coddy-contacts/CoddyContacts';
import Modal from '../CoddyShop/Modal';

import { useSelector } from 'react-redux';

const HomePage = () => {
    let view = useSelector(state => state.reducer.current_view);
    console.log(view)
    return (
        <>
            <News />
            <Courses />
            <DecorLine />
            <CoddyShop />
            {
            view ?
            <Modal />
            :
            ""
          }
            <DecorLine />
            <Schedule />
            <DecorLine />
            <CoddyContacts />
        </>
    );
};

export default HomePage;