import { useEffect } from "react";
import { createRef, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink as MyLink } from "react-router-hash-link";
import { getUser } from "../redux/action";
import {ADRESS} from "../redux/index"

function LkWindow() {
    let state = useSelector(state => state.reducer.user)
    let dispatch = useDispatch()

    console.log(state)

    useEffect(() => {   
        dispatch(getUser(state.id))
    },[])

    function update() {
        dispatch(getUser(state.id))
    }

    let id = createRef();
    let sum = createRef();

    async function send() {
        if (state.id == id.current.value) {
            alert("Это ты!")
        }
        else if (+sum.current.value < 0) {
            alert("Отрицательное кол-во нельзя!")
        }
        else if (state.coin <= 0) {
            alert("У тебя нет коддикоинов :(")
        }
        else if (+sum.current.value > +state.coin) {
            alert("У тебя нет столько коддикоинов :(")
        }
        else if (!id.current.value) {
            alert("Поле получаетля пусто :(")
        }
        else {  
            let body = {
                sendId: state.id,
                adressId: +id.current.value,
                summa: +sum.current.value
            }
            console.log(body)

            await fetch(`http://${ADRESS}:100/trade`, {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(r => r.json())
            .then(j => alert(j))

            update()
        }
    }


    

    return (
        <>
        <div className="cab__wrapper">
            <h1 className="cab__header">Привет {state.name}</h1>
            <div className="cab_lk">
                <div className="cab__info">
                    <h2 className="cab__balance">Баланс: <span>{state.coin}</span> COINS!</h2>
                    <h3>Твой ID: {state.id}</h3>
                </div>


                <div className="cab__send-box">
                    <input className="send-box__input admin__input" ref={id} placeholder="ID получателя" type="number" />
                    <input className="send-box__input admin__input" ref={sum} placeholder="Сумма" type="number" />
                    <button onClick={() => send()}>Отправить!</button>
                </div>

                <MyLink to="/#coddy-shop"><div className="backShop">Обратно в магазин</div></MyLink>
            </div>
        </div>
        </>
    )
}

export default LkWindow;