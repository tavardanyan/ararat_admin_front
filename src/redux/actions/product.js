import const_product from '../constants/product';
import const_alert from '../constants/alert';
import { bindActionCreators } from 'redux';
import * as AlertActions from './alert';
import axios from 'axios';
import { API_URL } from 'config.js';

const BindAlertActions = bindActionCreators(AlertActions, AlertActions.openConfirm);

export function checkSKU(SKU) {
    return (dispatch) => {
        if(SKU === null && SKU === ""){
            dispatch({
                type: const_product.CHECK_SKU,
                payload: const_product.DEFAULT_STATE.check_SKU
            });
        }
        else {
            var url = API_URL + "product/SKU/" + SKU;
            axios.get(url, SKU)
                .then(function (response) {
                    dispatch({
                        type: const_product.CHECK_SKU,
                        payload: response.data
                    });
                })
                .catch(function (error) {
                    console.log("ERROR_004_SERVER_REDUX_PRODUCT_SKU");
                });
        }
        

    }
}

export function addProduct(product) {
    return (dispatch) => {
        var url = API_URL + "product";
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };


        axios.post(url, product)
            .then(function (response) {

                url += "/image/" + response.data.id;
                axios.post(url, product.file, config)
                    .then(function (response1) {
                        dispatch({
                            type: const_product.ADD_PRODUCT,
                            payload: response1.data
                        });
                    })
                    .catch(function (error1) {
                        console.log("ERROR_006_SERVER_REDUX_PRODUCT_ADD_IMAGE");
                        console.log(error1);
                    });
            })
            .catch(function (error) {
                console.log("ERROR_005_SERVER_REDUX_PRODUCT_ADD");
                console.log(error);
            });
    }
}

export function storeNewProduct(product) {
    return {
        type: const_product.STORE_NEW_PRODUCT,
        payload: product
      }
}

export function getProduct(info) {
    return (dispatch) => {
        var url = API_URL + "product/get/" + info.by + "/" + info.value;
           
        axios.get(url)
            .then(function (response) {
                dispatch({
                    type: const_product.GET_PRODUCT,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log("ERROR_007_SERVER_REDUX_PRODUCT_GET");
            });
    }
}

