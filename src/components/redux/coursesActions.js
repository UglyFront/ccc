import { ADRESS } from "../redux/index";

export const GET_ALL_COURSES = "GET_ALL_COURSE";
export const GET_ALL_APLICATIONS = "GET_ALL_APLICATIONS";





export function getAllCourses() {
    return dispatch => {
            fetch(`http://${ADRESS}:100/courses`)
            .then(response => response.json())
            .then(json => dispatch({
                type: GET_ALL_COURSES,
                payload: json
            }))
    }
}
