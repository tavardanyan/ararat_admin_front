import const_category from '../constants/category';
import const_alert from '../constants/alert';
import { bindActionCreators } from 'redux';
import * as AlertActions from './alert';
import axios from 'axios';
import { API_URL } from 'config.js';

const BindAlertActions = bindActionCreators(AlertActions, AlertActions.openConfirm);

export function getAllCategory(size) {
  // return {
  //   type: const_category.GET_ALL_CATEGORY,
  //   payload: size
  // }
  return (dispatch) => {
    var url = API_URL + "category";
    axios.get(url)
      .then(function (response) {
        dispatch({
          type: const_category.GET_ALL_CATEGORY,
          payload: response.data
        });
      })
      .catch(function (error) {
        console.log("ERROR_002_SERVER_REDUX");
      });

  }
}

export function getCategory(id) {
  return {
    type: const_category.GET_CATEGORY,
    payload: id
  }
}

export function addCategory(category) {
  return (dispatch) => {
    var url = API_URL + "category/upload/img";
    axios.post(url, category.image)
      .then(function (response) {

        const data = {
          image: response.data,
          title: category.title,
          slug: category.slug,
          parent: category.parent,
          desc: category.desc
        }
        url = API_URL + "category";
        axios.post(url, data)
          .then(function (response2) {

            dispatch(AlertActions.openConfirm(const_alert.TYPE.success_category_add))
            
            setTimeout(function () {
              dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
            }, 3000);

            dispatch({
              type: const_category.ADD_CATEGORY,
              payload: {
                accept: true,
                url: response.data,
                title: category.title,
                slug: category.slug,
                parent: category.parent,
              }
            });

          })
          .catch(function (error2) {
            dispatch(AlertActions.openConfirm(const_alert.TYPE.error_category_add))
            setTimeout(function () {
              dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
            }, 3000);
            dispatch({
              type: const_category.ADD_CATEGORY,
              payload: {
                accept: false,
                error: error2
              }
            });
          });

      })
      .catch(function (error) {
        dispatch(AlertActions.openConfirm({
          type: "error",
          title: "Server Error!",
          text: "error_001_406",
          showConfirm: false,
          showCancel: false,
        }))
        setTimeout(function () {
          dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
        }, 3000);
        dispatch({
          type: const_category.ADD_CATEGORY,
          payload: {
            accept: false,
            error: error
          }
        });
      });
  }
}

export function updateCategory(category) {
  return (dispatch) => {
    var url = API_URL + 'category/' + category.id;
    axios.put(url, category)
      .then(function (response) {

        dispatch(AlertActions.openConfirm(const_alert.TYPE.success_category_update))
            
        setTimeout(function () {
          dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
        }, 3000);

        dispatch({
          type: const_category.UPDATE_CATEGORY,
          payload: response.data.id
        });
      })
      .catch(function (error) {
        console.log("ERROR_003_404_SERVER_REDUX");
      });

  }
}

export function bulkUpdateCategory(category) {
  return (dispatch) => {
    var url = '';
    category.forEach((i, index) => {
      API_URL + 'category/' + i.element.id;
      axios.put(url, i.element)
        .then(function (response) {

          
        })
        .catch(function (error) {
          console.log("ERROR_003_404_SERVER_REDUX");
        });
    });

    dispatch(AlertActions.openConfirm(const_alert.TYPE.success_category_update))
              
    setTimeout(function () {
      dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
    }, 3000);

    dispatch({
      type: const_category.UPDATE_CATEGORY,
      payload: "response.data.id"
    });
    
  }
}

export function deleteCategory(id) {
  return (dispatch) => {
    var url = API_URL + 'category/' + id;
    axios.delete(url)
      .then(function (response) {

        dispatch(AlertActions.openConfirm(const_alert.TYPE.success_category_delete))
            
        setTimeout(function () {
          dispatch(AlertActions.openConfirm(const_alert.TYPE.close))
        }, 3000);

        dispatch({
          type: const_category.DELETE_CATEGORY,
          payload: response.data.id
        });
      })
      .catch(function (error) {
        console.log("ERROR_003_404_SERVER_REDUX");
      });

  }
}

export function changeCategoryAcceptStatus() {
  return {
    type: const_category.CHANGE_ACCEPT_STATUS
  }
}
