import{configureStore} from '@reduxjs/toolkit'
import loaderReducer from '../slice-state/loaderSlice'
import productsReducer from '../slice-state/productsSlice'


export default configureStore({
    reducer:{
        progress:loaderReducer,
        products:productsReducer       
    }
})