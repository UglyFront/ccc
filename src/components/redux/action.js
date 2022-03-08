

import { ADRESS } from "../redux/index";



export const ALL = "ALL"
export const ALL_CATEGORY = "ALL_CATEGORY"
export const SELECT_CATEGORY = "SELECT_CATEGORY"
export const SEARCH = "SEARCH"
export const CURRENT_WIDNOW = "CURRENT_WIDNOW"
export const H_SORT = "H_SORT"
export const L_SORT = "L_SORT"

export const UPD_USER = "UPD_USER"


export const LOGIN = "LOGIN"
export const UPD_COIN = "UPD_COIN"

export const VIEW = "VIEW"


export const ALL_LESSONS = "ALL_LESSONS"


export const ADD_CATEGORY = "ADD_CATEGORY"
export const DEL_CATEGORY = "DEL_CATEGORY"



export function getAll() {
    return dispatch => {
            fetch(`http://${ADRESS}:100/all`)
            .then(response => response.json())
            .then(json => dispatch({
                type: ALL,
                payload: json
            }))
    }
}

export function getCat() {
    return dispatch => {
        fetch(`http://${ADRESS}:100/categories`)
        .then(response => response.json())
        .then(json => dispatch({
            type: ALL_CATEGORY,
            payload: json
        }))
    }
}


export function logCheck(login, password) {

    let body = {
        login: login,
        password: password
    }

    return dispatch => {
        fetch(`http://${ADRESS}:100/login`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => dispatch({
            type: LOGIN,
            payload: json
        }))
    }
}


export function allLessons() {
    return dispatch => {
        fetch(`http://${ADRESS}:100/lessons`)
        .then(response => response.json())
        .then(json => dispatch({
            type: ALL_LESSONS,
            payload: json
        }))
    }
}


export function getUser(id) {

    return dispatch => {
        fetch(`http://${ADRESS}:100/getuser`, {
            method: "put",
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => dispatch({
            type: UPD_USER,
            payload: json
        }))
    }
}

