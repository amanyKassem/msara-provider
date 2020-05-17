import axios from "axios";
import CONST from "../consts";


export const getStatistics = (lang ,token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'statistics',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getStatistics', payload: response.data});
        });
    }
};
