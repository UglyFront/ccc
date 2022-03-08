import React from 'react';
import Post from '../../post/Post';
import DecorHeader from '../../../utils/decor-header/DecorHeader';
import "./blog.scss";
import { getAllPosts } from '../../redux/postActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikes } from '../../redux/postActions';


const BlogPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

  

    const allPosts = useSelector(state => state.posts.posts);

    const user_id = useSelector(state => state.reducer.user.id);


    useEffect(() => {
        if(user_id) {
            dispatch(getUserLikes(user_id));
        }
    }, [])



    const selectPost = (id) => {
        localStorage.removeItem("selectedPost");
        localStorage.setItem("selectedPost", id);
        console.log(id)
    }

    return (
        <>
            <DecorHeader text="Coddy <News/>" />
            <div className='blog-page'>


                {
                    allPosts.length === 0 ?
                    <p style = {{'textAlign': 'center', 'fontSize': '24px'}}>Постов пока нет...</p>
                    :
                    allPosts.map(post => {
                   

                        return (
                            <Post
                                key={post.id}
                                text={post.body}
                                authorName={post.name}
                                id={post.id}
                                selectPost={selectPost}
                                imgAuthor={post.img}
                                img1={post.imgpost}
                                img2={post.imgpost2}
    
                            />
                        )
                    })
                }

            </div>
        </>
    );
};

export default BlogPage;