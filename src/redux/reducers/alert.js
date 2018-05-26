import const_alert from '../constants/alert';

export default function Alert(state = const_alert.DEFAULT_STATE, action) {
    switch (action.type) {

        case const_alert.OPEN_CONFIRM:
            return { ...state, ...action.payload };

        default:
            return state;
    }

}