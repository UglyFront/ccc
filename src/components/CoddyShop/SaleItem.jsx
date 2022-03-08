import { Link } from "react-router-dom";
import { CURRENT_WIDNOW, VIEW } from "../redux/action"
import {useDispatch} from "react-redux"


function SaleLItem(props) {

    let dispatch = useDispatch();



    function select() {
      dispatch({
        type: CURRENT_WIDNOW,
        payload: {
            name: props.name,
            img: props.img,
            price: props.price,
            price_rub: props.price_rub
        }})


        dispatch({
          type: VIEW,
        })

    }


    return (
      <div className="item">
             <img src={props.img === "" ? 'https://brilliant24.ru/files/cat/template_01.png' : props.img} alt="" />
              <p>{props.name}</p>
              <div className="price">
                  <div className="price__text"><span>{props.price}</span> COINS</div>
                  {
                    props.price_rub ?
                    <div className="price__rub"> /
                    <span> 
                    {props.price_rub}
                    </span> <b>₽</b></div>
                    :
                    <></>
                  }

                  <div className="add" onClick={() => select()}>Подробнее</div>
              </div>
      </div>
    );
  }
  
  export default SaleLItem;

