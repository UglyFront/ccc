import {useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import {UPD_COIN, VIEW} from "../redux/action"
import {ADRESS} from "../redux/index";


function Modal() {

    let dispatch = useDispatch()

    let user = useSelector(state => state.reducer.user)

    function post() { 
       // // let val = inp.current.value///////////////////
        ////// if (val !== '' && val.match(/[A-Za-z]/) || val.match(/[А-Яа-я]/) ) {//////////////////

           // 89.108.71.167:100


            //////////////////////////////////////////////////////////////////


            // const ADRESS = "89.108.71.167"

            if (user.name === undefined) {
                alert("Сначала войди в свой профиль")
            }
            else {
                if (user.coin < state.price) {
                    alert("К сожалению у тебя не хватает CODDYCOIN")
                }
                else {

                    let body = {
                        id: Math.random()*230,
                        name: user.name,
                        order_name: state.name,
                        price: +state.price
                    }
        

                    let bodyPut = {
                        id: user.id,
                        potrat: state.price
                    }

                   
                        fetch(`http://${ADRESS}:100/updatecoin`, {
                        method: "put",
                        body: JSON.stringify(bodyPut),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => response.json())
                    .then(json => dispatch({
                        type: UPD_COIN,
                        payload: json
                    }))


                    fetch(`http://${ADRESS}:100/order`, {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => response.json())
                    .then(json => alert(json))
                   
                }
            }
    }

    let state = useSelector(state => state.reducer.current)


    const styleImg = {
        width: "200px",
        height: "130px",
        marginTop: '100px',
        marginLeft: '-45px'
    }

    if (state.name !== 'Что-то пошло не так ⚠') {
      return (
        <div className="blocked">
            <div className="window">

                <div className="head__window">
                    <img style={styleImg} src={state.img} alt="" />
                    <h3>{state.name}</h3>
                    <div className="x" style = {{"cursor":"pointer"}} onClick = {() => {
                    dispatch({
                        type: VIEW
                    })
                }}>
                ×
                </div>
                </div>

                <footer>
                    {
                        state.price_rub ?
                        <h4><span>{state.price}</span> COINS / <span>{state.price_rub}</span>₽</h4>
                        :
                        <h4><span>{state.price}</span> COINS</h4>
                    }
                    <div className="btn" onClick={() => {post()}}>Заказать онлайн</div>
                </footer>
    
            </div>
        </div>
      );
    }
    else {
        return (
        <div className="blocked">
        <div className="window">

            <div className="head__window">
                <h3 style={{margin: "0 auto"}}>Что-то пошло не так ⚠</h3>
                <Link to = "/"><div className="x">
                    ×
                    </div></Link>
            </div>

        </div>
    </div>
        )
    }
}
    
export default Modal;
