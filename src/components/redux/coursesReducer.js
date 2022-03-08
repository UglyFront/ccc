import {GET_ALL_COURSES} from "./coursesActions";




const initialState = {

    allCourses: [],

};



export default function coursesReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_COURSES:
            return {
                ...state,
                allCourses: [...action.payload]
            }

        


        default:
            return state
    }
}