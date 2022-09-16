import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice ({
    name:'progress',
    initialState: {
        loader: "d-none"
    },
    reducers:{
        showLoader: (state)=>{
          state.loader=""  
        },
        hideLoader:(state)=>{
            state.loader="d-none"
        }
    }
})
export const {showLoader, hideLoader} = loaderSlice.actions
export default loaderSlice.reducer