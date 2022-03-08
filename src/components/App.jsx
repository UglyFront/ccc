import React from 'react';
import Header from './header/Header';
import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin(vremennaya)/Admin';
import Login from "./Login(vremennaya)/Login";  // ЗЕЛЕНАЯ ХУЕТА СНИЗУ
import LoginWindow from "./Login(vremennaya)/LoginWindow";
import LkWindow from "./Login(vremennaya)/LkWindow";

import HomePage from './Pages/HomePage';
import BlogPage from "./Pages/BlogPage/BlogPage";
import PostPage from "./Pages/PostPage/PostPage";

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allLessons, getAll, getCat } from "./redux/action";
import { getLastTwoPost } from './redux/postActions';
import ModerPosts from './ModerPosts/ModerPosts';
import { getAllCourses } from './redux/coursesActions';
import CoursePage from './courses/CoursePage';

import goTopIcon from "../assets/images/go-to-top.svg"
import Table from './Table/Table';


const App = () => {
  //

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll());
    dispatch(getCat());
    dispatch(getLastTwoPost());
    dispatch(getAllCourses());
    dispatch(allLessons())
  }, [])


  let user = useSelector(state => state.reducer.user)



  // НАЧАЛЬНОЕ ПОЛУЧЕНИЕ ДАННЫХ


  return (
    <>

      <div className='app'>

        <Header />
        <Login />      


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/adm" element={<Admin />} />
          <Route path="/adm/table" element={<Table />} />
          <Route path="/moder" element={<ModerPosts />} />
        </Routes>

        <span className="go-to-top-box">
          <a href='#header'><div><img src={goTopIcon} alt="" /></div></a>
        </span> 
      </div>


      <Routes>
        {user.id === undefined ?
          <Route path="/login" element={<LoginWindow />} />
          :
          <Route path="/cab" element={<LkWindow />} />
        }
      </Routes>
    </>
  );
};

export default App;