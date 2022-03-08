import { ADRESS } from "../redux/index";



export const LAST_TWO_POSTS = "LAST_TWO_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const SELECT_POST = "SELECT_POST";
export const GET_COMMENTS_POST = "GET_COMMENTS_POST";
export const SET_COUNT_LIKES = "SET_COUNT_LIKES";
export const LIKE_POST = "LIKE_POST";
export const GET_USER_LIKES = "GET_USER_LIKES";


export function getLastTwoPost() {
    return dispatch => {
            fetch(`http://${ADRESS}:100/posts_two`)
            .then(response => response.json())
            .then(json => dispatch({
                type: LAST_TWO_POSTS,
                payload: json
            }))
    }
}
export function getAllPosts() {
    return dispatch => {
            fetch(`http://${ADRESS}:100/posts`)
            .then(response => response.json())
            .then(json => dispatch({
                type: GET_ALL_POSTS,
                payload: json
            }))
        }
}
export function getOnePost(id) {
    return dispatch => {
        fetch(`http://${ADRESS}:100/posts?id=${id}`)
            .then(response => response.json())
            .then(json => dispatch({
                type: SELECT_POST,
                payload: json[0]
            }))
        }
}

export function getCommentsPost() {
    let body = {
        post_id: localStorage.getItem("selectedPost"),
    }
    return dispatch => {
        fetch(`http://${ADRESS}:100/comment_post`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(json => dispatch({
                type: GET_COMMENTS_POST,
                payload: json
            }))
        }
}



export function getUserLikes(id) {
    let body = {
        user_id: id
    }
    return dispatch => {
        fetch(`http://${ADRESS}:100/posts_like_user`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(json => dispatch({
                type: GET_USER_LIKES,
                payload: json
            }))
        }
}










