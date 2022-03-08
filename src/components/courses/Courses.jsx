import React from 'react';
import { useSelector } from 'react-redux';
import './courses.scss'
import DecorHeader from "../../utils/decor-header/DecorHeader"
import MultipleItems from '../../utils/Slider/MultipleItems';
const Courses = () => {

    const allCourses = useSelector(state => state.courses.allCourses);


    return (


        <div className='course__section' id={"courses"}>
            <DecorHeader text="Coddy <Course/>" />
            <div className='courses'>

                {/* ЭТО СЛАЙДЕР */}
                <MultipleItems courses={allCourses} />

            </div>
        </div>
    );

};

export default Courses;