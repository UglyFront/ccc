import React from 'react';
import { useSelector } from 'react-redux';
import {useState} from "react"
import {useDispatch} from "react-redux"
import { SEARCH } from "../redux/action";




const TopShop = () => {

    let user = useSelector(state => state.reducer.user)


    let dispatch = useDispatch()

    let [input, setInput] = useState()
  
   function handleChange(event) {
    setInput(input = event.target.value);
  
    dispatch({
      type: SEARCH,
      payload: input
    })
    }

    return (
        <div className="top_shop">
            <div className="wrapper_top_shop">
                <input placeholder='Поиск...' onChange={handleChange}/>



                {
                user.name === undefined ? 

                <p>
                    Привет незнакомец!
                </p>

                :

                <p>
                    Привет {user.name} твой баланс {user.coin}!
                </p>
                }


            </div>
        </div>
    );
};



export default TopShop;