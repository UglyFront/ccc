import {    LAST_TWO_POSTS,
            GET_ALL_POSTS,
            SELECT_POST,
            GET_COMMENTS_POST,
            GET_USER_LIKES,
            
        } from "./postActions"


const initialState = {

    lastTwoPosts: [],
    posts: [],
    selectedPost: [],
    commentsPost: [],
    countLikes: 0,
    userLikes: [],
};



export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case LAST_TWO_POSTS:
            return {
                ...state,
                lastTwoPosts: [...action.payload]
            }

        case GET_ALL_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case SELECT_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        case GET_COMMENTS_POST:
            return {
                ...state,
                commentsPost: action.payload
            }
        case GET_USER_LIKES:
            return {
                ...state,
                userLikes: action.payload
            }
            

        default:
            return state
    }
}