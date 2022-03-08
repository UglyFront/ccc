import { UPD_USER,ALL_LESSONS, ALL, ALL_CATEGORY, SELECT_CATEGORY, SEARCH, CURRENT_WIDNOW, H_SORT, L_SORT, LOGIN, UPD_COIN, VIEW } from "./action";

let stateDefault = {
    all: [

    ],

    outCatId: [

    ],

    category: [

    ],

    category_name: 'Все',

    current: {
        name: "Что-то пошло не так ⚠"
    },

    current_view: false,


    sch: [

    ],

    user: {
        id: undefined,
        login: undefined,
        password: undefined,
        name: undefined,
        coin: undefined,
    }
};

export default function reducer(state = stateDefault, action) {
    switch (action.type) {
        case ALL:
            return { ...state, all: [...action.payload], outCatId: [...action.payload] }
        case ALL_CATEGORY:
            return { ...state, category: [...action.payload] }
        case SELECT_CATEGORY:
            let name = action.payload.name

            if (action.payload.id !== 0) {
                let id = action.payload.id
                let out = new Array(0)

                state.all.forEach(el => {
                    if (el.cat_id === id) {
                        out.push(el)
                    }
                })

                return { ...state, outCatId: out, category_name: name }
            }
            else {
                return { ...state, outCatId: [...state.all], category_name: name }
            }
        case SEARCH:
            let val = action.payload.toLowerCase();
            let out2 = new Array(0)
            let nameArr = new Array(0)
            state.all.forEach(el => {
                nameArr.push(el.name.toLowerCase())
            })
            nameArr.forEach(el => {
                if (el.includes(val)) {
                    state.all.forEach(stateEl => {
                        if (el.toLowerCase() === stateEl.name.toLowerCase()) {
                            out2.push(stateEl)
                        }
                    })
                }
            })

            if (action.payload === "" || action.payload === " ") {
                return { ...state, outCatId: [...state.all], category_name: "Поиск" }
            }
            else {
                return { ...state, outCatId: [...out2], category_name: "Поиск" }
            }

        case CURRENT_WIDNOW: return { ...state, current: { ...action.payload } }

        case H_SORT:
            let newArr = [...state.outCatId]
            return { ...state, outCatId: newArr.sort((a, b) => a.price - b.price) }

        case L_SORT:
            let newArr2 = [...state.outCatId]
            return { ...state, outCatId: newArr2.sort((a, b) => b.price - a.price) }






        case LOGIN:
            if (!action.payload.id) {
                alert('Неверный логин или пароль')
            }
            else {
                alert(`Привет ${action.payload.name}!`)
                return { ...state, user: action.payload }
            }
        
        case UPD_USER:
            return{...state, user: action.payload}

        case UPD_COIN:
            console.log(action.payload)
            return { ...state, user: { ...action.payload } }




        case VIEW:
            let stateView = state.current_view
            return{...state, current_view: !stateView}


        case ALL_LESSONS:
            return{...state, sch: action.payload}
            





        default: return state
    }
}