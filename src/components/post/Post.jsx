import React from 'react';
import "./post.scss";
import commentIcon from "../../assets/images/comment-icon.svg";
import likeIcon from "../../assets/images/like-icon.svg";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserLikes } from '../redux/postActions';
import { ADRESS } from '../redux/index';


const Post = (props) => {


    // debugger

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.reducer.user.id);
    const post_id = props.id;

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);


    async function getLikesPost(id) {

        let body = {
            post_id: id,
        }

        await fetch(`http://${ADRESS}:100/count_likes_post`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(json => setLikesCount(json));


    }


    // Получили лайкнутые посты залогиненого юзера
    useEffect(() => {
        if(user_id) {
            dispatch(getUserLikes(user_id));
        }

    }, [liked])

    // Получили и установили лайки этого поста
    useEffect(() => {
        getLikesPost(post_id);
    }, [liked])


    // Лайки залогиненого юзера
    const userLikes = useSelector(state => state.posts.userLikes);

    useEffect(() => {
        if(user_id) {
            dispatch(getUserLikes(user_id));

        }
        for (let i = 0; i < userLikes.length; i++) {
            // debugger
            if (post_id == userLikes[i].post_id) {
                setLiked(true);
                break;
            }
        }
    }, [likesCount])






    async function likePost(id, user_id) {
      
        let body = {
            user_id: user_id,
            post_id: id,
        }
        if (user_id == undefined) {
            alert("Войдите в свой профиль");
            return
        }

        
        await fetch(`http://${ADRESS}:100/posts_like`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
        getLikesPost(post_id)
        setLiked(true);

        setTimeout(() => {
            
        }, 1500)


    }

    async function unLikePost(id, user_id) {
        let body = {
            user_id: user_id,
            post_id: id,
        }

        if (user_id == undefined) {
            alert("Войдите в свой профиль");
            return
        }


        await fetch(`http://${ADRESS}:100/posts_like`, {
            method: "delete",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
          
        setLiked(false)

        setTimeout(() => {

        }, 1500)

    }



    return (
        <div className='post'>


            <div className="post-content">


                <div className="post__preview-text-box">
                    <div className="post__header">
                        <img className="post__imgAuthor" src={props.imgAuthor} alt="authorIcon" />
                        <h3 className='post__author-name'>{props.authorName}</h3>
                    </div>

                    <div className="post__preview-text">
                        <p>{props.text}</p>
                        <p>Post Id: {post_id}</p>
                    </div>
                </div>

            
            </div>

            <div className="comments-likes">

                <div className="commment-block">
                    <img src={commentIcon} alt="commentIcon" />
                    <Link 
                     to="/post"
                     onClick={() => props.selectPost(post_id)}
                    className='comment__link' href="#">Комментрировать</Link>
                </div>

                <div className="like-block">
                    <span className='likes-count'>{likesCount}</span>

                    {liked ?   <button className="liked like-button"
                        onClick={() => unLikePost(post_id, user_id)}
                    >
                        <img src={likeIcon} alt="likeIcon" /></button>
                        
                    :
                    
                    <button className="unliked like-button"
                    onClick={() => likePost(post_id, user_id)}
                >
                    <img src={likeIcon} alt="likeIcon" /></button>}
                </div>



            </div>

            <div className="post__view-full">
                <Link className='post__view-full__link'
                    to="/post"
                    onClick={() => props.selectPost(post_id)}
                >
                    Читать полностью
                </Link>

            </div>

        </div>

    );
};

export default Post;
