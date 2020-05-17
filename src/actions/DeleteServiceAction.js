import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const deleteService = (lang , service_id , token , navigation ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'delete_service',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,service_id }
        }).then(response => {
            if (response.data.success) {

                navigation.navigate('confirmDeleteService')

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
