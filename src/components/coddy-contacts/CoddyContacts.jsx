import React from 'react';
import DecorHeader from '../../utils/decor-header/DecorHeader';
import "./coddy-contacts.scss"

const CoddyContacts = () => {
    return (
        <footer>
            <div className="coddy-contacts" id='contacts'>
                <DecorHeader text="Coddy <Contacts/>" />   

                <p style = {{"paddingBottom": "20px"}} className="city-footer">{"<Mikhaylovsk>"}</p>
                <h4>Телефон: 8(999)-222-22-22</h4>
                <h4>Адрес: ул. Логачевская 95</h4>
                
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2814.774494221668!2d42.02155155159127!3d45.13090527899578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f90458d4438c39%3A0xdaefadc800c3a070!2z0JvQvtCz0LDRh9C10LLRgdC60LDRjyDRg9C7LiwgOTUsINCc0LjRhdCw0LnQu9C-0LLRgdC6LCDQodGC0LDQstGA0L7Qv9C-0LvRjNGB0LrQuNC5INC60YDQsNC5LCAzNTYyNDA!5e0!3m2!1sru!2sru!4v1645032575798!5m2!1sru!2sru"  width="100%" height="450" allowFullScreen="" loading="lazy"></iframe>
            </div>            
        </footer>
    );
};

export default CoddyContacts;