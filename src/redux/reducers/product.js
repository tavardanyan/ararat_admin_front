import const_product from '../constants/product';

export default function Product(state = const_product.DEFAULT_STATE, action) {
    switch (action.type) {

        case const_product.CHECK_SKU:
            return { ...state, check_SKU: action.payload };

        case const_product.STORE_NEW_PRODUCT:
            return Object.assign({}, state, { new_product: { ...state.new_product, ...action.payload } } )

        case const_product.ADD_PRODUCT:
            return {};

        case const_product.GET_PRODUCT:
            return Object.assign({}, state, { product: action.payload } )

        default:
            return state;
    }

}