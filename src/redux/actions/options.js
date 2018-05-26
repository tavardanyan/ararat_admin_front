import const_options from '../constants/options';
import const_alert from '../constants/alert';
import { bindActionCreators } from 'redux';
import * as AlertActions from './alert';
import axios from 'axios';
import { API_URL } from 'config.js';

export function getOptions() {
    return (dispatch) => {
        var url = API_URL + "options";
        axios.get(url)
            .then(function (response) {
                dispatch({
                    type: const_options.GET_OPTIONS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log("ERROR_005_SERVER_REDUX_GET_OPTIONS");
            });
    }
}

export function updateOptions(type, value) {
    return (dispatch) => {
        var url = API_URL + "options";
        console.log(value)
        axios.post(url, value)
            .then(function (response) {
                dispatch({
                    type: const_options.UPDATE_OPTIONS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log("ERROR_006_SERVER_REDUX_UPDATE_OPTIONS");
            });

    }
}


