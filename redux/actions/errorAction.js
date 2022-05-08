import {
    SET_ERROR,
} from "../actionTypes";


export function setError(errorContent) {
    return {
        type: SET_ERROR,
        payload:{
            "show_error":true,
            "errorContent":errorContent
        },
    };
}
