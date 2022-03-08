import React from 'react';
import DecorHeader from '../../utils/decor-header/DecorHeader';
import "./schedule.scss"

import { useSelector } from 'react-redux';


const Schedule = () => {

    let state = useSelector(state => state.reducer.sch)

    return (
        <div className='schedule' id='schedule'>
            <DecorHeader text="Coddy <Lessons/>" />


            <div className="schedule__inner">

                {state.map(el => {
                    console.log(el)
                    return <div className="schedule__item" key={el.id}>
                        <h3 className="schedule__header">{el.name}</h3>

                        <ul className='schedule__list'>

                            {el.lessons.map(le => {
                                return <li key={le.id}><a className='schedule__link' href="#">{le.time}: - {le.name}</a></li>
                            })}
                        </ul>
                    </div>
                })}

            </div>

        </div>
    );
};

export default Schedule;