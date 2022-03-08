import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../components/courses/courses.scss"


function selectCourse(name) {
  localStorage.removeItem("selectedCourse");
  localStorage.setItem("selectedCourse", name);
}

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.courses.map(course => {
            return (
              <div className="courses__item" key={course.id}>

                <Link
                  onClick={() => selectCourse(course.title)}
                  className='courses__link'
                  to="/course" href="#"
                >

                  <img src={course.img} alt="course-img" />
                  <h2>{course.title}</h2>

                </Link>

              </div>
            )
          })}
        </Slider>
      </div>
    );
  }
}
