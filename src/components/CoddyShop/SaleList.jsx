import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import SaleItem from "./SaleItem"
import { useSelector } from "react-redux";

function SaleList() {
  
    let state = useSelector(store => store.reducer.outCatId)
    let namecat = useSelector(store => store.reducer.category_name)


    console.log(state)

    return (
      <article>
 
            <div className="wrapper_item">
              
            {state.length === 0 && namecat !== "Поиск" ? 
            <Loader style = {{margin: "0 auto"}}type="Triangle"
            color="#895fff"
            height={200}
            width={200}/>
            : 
            
            state.map(el => <SaleItem key = {Math.random()*10000} name = {el.name} id = {el.id} price = {el.price} img = {el.img} price_rub = {el.price_rub}/>)
          }

        {state.length === 0 && namecat === "Поиск" ? 
          <h1>Не нашлось :(</h1> 
          :
           <></>
          }

            </div>
      </article>
    );
  }
  
  export default SaleList;