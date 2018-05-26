import const_category from '../constants/category';

export default function Category(state = const_category.DEFAULT_STATE, action) {
    switch (action.type) {

        case const_category.GET_ALL_CATEGORY:
            return { ...state, category: action.payload };
        
        case const_category.ADD_CATEGORY:
            return { ...state, new_category: action.payload }

        case const_category.CHANGE_ACCEPT_STATUS:
            return { ...state, new_category: { accept: null } }

        case const_category.DELETE_CATEGORY:
            return state 

        default:
            return state;
    }

}