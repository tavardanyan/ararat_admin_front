import { combineReducers } from 'redux'
import Category from './category'
import Alert from './alert'
import Product from './product'
import Options from './options'

export default combineReducers({
  Category,
  Alert,
  Product,
  Options,
})