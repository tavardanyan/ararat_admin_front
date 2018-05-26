import { lang } from "config.js";
const const_alert = {

    OPEN_CONFIRM: "OPEN_CONFIRM",

    DEFAULT_STATE: {
        type: 'default',
        show: false,
        title: "",
        text: "",
        showCancel: false,
        showConfirm: true,
        confirmBtnText: "",
        cancelBtnText: "",
        confirmBtnCssClass:  "",
        cancelBtnCssClass:  "",
        defaultValue: '',
        validationMsg: lang.shop.validationMsg,
        validationRegex: {},
        onConfirm: () => {},
        onCancel: () => {}
    },

    TYPE: {
        success_category_add: {
            type: "success",
            show: true,
            style: { display: "block", marginTop: "-100px" },
            title: lang.categorySuccessAdd,
            showConfirm: false,
            showCancel: false,
            text: ""
        },
        success_category_delete: {
            type: "success",
            show: true,
            style: { display: "block", marginTop: "-100px" },
            title: lang.categorySuccessDelete,
            showConfirm: false,
            showCancel: false,
            text: ""
        },
        success_category_update: {
            type: "success",
            show: true,
            style: { display: "block", marginTop: "-100px" },
            title: lang.categorySuccessUpdate,
            showConfirm: false,
            showCancel: false,
            text: ""
        },
        error_category_add: {
            type: "error",
            show: true,
            style: { display: "block", marginTop: "-100px" },
            title: "Error!",
            showConfirm: false,
            showCancel: false,
        },
        close: {
            show: false,
        }
    }
};
export default const_alert;