import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const setStatus = (lang , booking_id , status , token , navigation ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'set_status',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,booking_id , status }
        }).then(response => {
            if (response.data.success) {

                status === 2 ? navigation.navigate('confirmService') : navigation.navigate('confirmRefuse')

            }
            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'sukar',
                    textAlign   : 'center'
                }
            });
        });

    }
};
