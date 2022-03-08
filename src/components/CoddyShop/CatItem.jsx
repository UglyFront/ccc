import React from 'react';
import {useDispatch} from "react-redux"
import { SELECT_CATEGORY } from "../redux/action";




const CatItem = (props) => {

    let dispatch = useDispatch()

    return (
        <li onClick={() => {dispatch({
            type: SELECT_CATEGORY,
            payload: {
                id: props.id,
                name: props.name
            }
        })}}>{props.name}</li>
    );
};



export default CatItem;