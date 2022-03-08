import React from 'react';
import { useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses } from '../redux/coursesActions';
import "./courses.scss";
import { ADRESS } from "../redux/index";
import bookIcon from "../../assets/images/book.svg"

const CoursePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourses());
    }, [])

    const allCourses = useSelector(state => state.courses.allCourses);


    let parentName = createRef();
    let childName = createRef();
    let childAge = createRef()
    let phone = createRef();

    async function signUpToCourse() {

        let body = {
            parent: parentName.current.value,
            child: childName.current.value,
            age: +childAge.current.value,
            phone: phone.current.value,
            course_title: localStorage.getItem("selectedCourse")
        }


        if (body.parent && body.child && body.phone) {
            console.log("ok")
        }
        else {
            alert("Заполните все поля");
            return
        }

        await fetch(`http://${ADRESS}:100/gocourse`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => alert(data))


    }


    return (
        <div className='coursePage'>
            {allCourses.map(course => {
                if (course.title == localStorage.selectedCourse) {
                    return (
                        <div className='course' key={course.id}>
                            ID: {course.id}
                            <h2 className='course__header'>{course.title}</h2>

                            <p>
                                <img className="course__img" src={course.img} alt="courseImg" />
                            </p>

                            <p className='course__description'>
                                {course.description}
                            </p>

                            <img className='course__book' src={bookIcon} alt="" />




                            <form className='course__signUp' action="">

                                <input className='course__input' ref={parentName} type="text" placeholder='ФИО Родителя' />
                                <input className='course__input' ref={childName} type="text" placeholder='ФИО Ребенка' />
                                <input className='course__input' ref={childAge} type="text" placeholder='Возраст ребенка' />
                                <input className='course__input' ref={phone} type="text" placeholder='Телефон для связи' />

                                <button className="gradient course__signUp__btn" type='button' onClick={() => signUpToCourse()}>
                                    ЗАПИСАТЬСЯ НА КУРС
                                    <span>{course.price}₽/месяц</span>
                                </button>
                            </form>

                        </div>
                    )
                }
            })}
        </div>
    );
};

export default CoursePage;