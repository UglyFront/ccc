import React from 'react';
import './news.scss';
import DecorHeader from '../../utils/decor-header/DecorHeader';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getLastTwoPost } from '../redux/postActions';
import { useDispatch, useSelector } from 'react-redux';



const News = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastTwoPost());
        console.log("запрос последних постов");

    }, [])

    const lastTwoPosts = useSelector(state => state.posts.lastTwoPosts);

    console.log(lastTwoPosts)

    return (
        <div className='news'>

            <DecorHeader text="Coddy <News/>" />



            <div className="news__inner">

                <div className="news__container">

                    {lastTwoPosts.length === 0 ? 
                    <h2>Новостей пока нет...</h2>
                    :
                    lastTwoPosts.map((post) => {
                        return (
                            <div className="news__item" key={post.id}>
                        <div className="news__header">

                            <img className='news__item__author-logo' src={post.img} alt="" />
                            <h3 className="news__item__author">{post.name}</h3>

                        </div>

                        <div className="news__content">
                            <p className='news__text'>{post.body}</p>
                        </div>
                    </div>
                        )
                    })
                    }


                </div>

                <div className="see-all-news">
                    <Link to="/blog" className='see-all-news__link'>{">"}</Link>
                </div>

            </div>
        </div>
    );
};

export default News;