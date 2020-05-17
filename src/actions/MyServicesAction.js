import axios from "axios";
import CONST from "../consts";


export const getMyServices = (lang ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'my_services',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getMyServices', payload: response.data});
        });
    }
};
