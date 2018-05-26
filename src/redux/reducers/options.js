import const_options from '../constants/options';

export default function Product(state = const_options.DEFAULT_STATE, action) {
    switch (action.type) {

        case const_options.GET_OPTIONS:
            return Object.assign({}, state, action.payload )

        case const_options.UPDATE_OPTIONS:
            return Object.assign({}, state, action.payload )

        default:
            return state;
    }

}