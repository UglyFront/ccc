import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsPost } from '../../redux/postActions';

const Comments = (props) => {

    const dispatch = useDispatch();
    const [countFetch, setCountFetch] = useState(0);



    useEffect(() => {
        dispatch(getCommentsPost());
        // console.log("fetching Comments");
        // console.log(countFetch);

    }, [countFetch])

    useEffect(() => {
        const id = setInterval(() => {
            setCountFetch((c) => c + 1);
        }, 4000)

        return () => clearInterval(id);
    }, [])


    const commentsPost = useSelector(state => state.posts.commentsPost);

    return (
        <div className="post-page__comments">
            <h2>Комментарии:</h2>
            {commentsPost.map(comment => {
                return (
                    <div className="comments" key={comment.id}>

                        {comment.user_name + ":"} <br/>
                        {comment.body}
                    </div>
                )
            })}

        </div>
    );
};

export default Comments;