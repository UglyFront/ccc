import React from 'react';
import "./post-page.scss";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsPost, getOnePost } from '../../redux/postActions';
import Comments from './Comments';
import { ADRESS } from '../../redux/index';


const PostPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("fetching")
        dispatch(getOnePost(localStorage.getItem("selectedPost")));
    }, [])



    const selectedPost = useSelector(state => state.posts.selectedPost);
    const user_name = useSelector(state => state.reducer.user.name);


 

    const [commentText, setCommentText] = useState("");

    console.log(commentText.replace(/\s+/g, ' ').trim());

    async function addComment() {
        let text = commentText.replace(/\s+/g, ' ').trim();

        if (user_name == undefined) {
            alert("Войдите в профиль");
            return
        }

        if (text.length == 0) {
            alert("Введите комментарий");
            return
        }

        let body = {
            post_id: selectedPost.id,
            user_name: user_name,
            body: text,
        }

        console.log(body)



        await fetch(`http://${ADRESS}:100/comment`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())

        setCommentText("")
        dispatch(getCommentsPost());

    }
 
        return (

            <div className='post-page'>
                <div className="post-page__inner">
                    <div className="post-page__header">
                        <h2>{selectedPost.name}</h2>
                    </div>

                    <div className="post-page__text">
                        <p>{selectedPost.body}</p>
                    </div>

                    <div className="post-page__images">
                        <img src={selectedPost.imgpost || ""} alt="" />
                        <img src={selectedPost.imgpost2 || ""} alt="" />
                    </div>
                </div>

                <div className="post-page__add-comment">
                    <input className='add-comment__text' value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" />
                    <button className='add-comment__btn gradient' onClick={() => addComment()}>Комментрировать</button>
                </div>
                
                <Comments 


                
                />

            </div>
        )

};

export default PostPage;
