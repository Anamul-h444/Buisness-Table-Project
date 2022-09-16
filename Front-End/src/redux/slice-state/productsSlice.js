import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice ({
    name:'products',
    initialState: {
        Total: " ",
        Rows:[]
    },
    reducers:{
        setTotal: (state, actions)=>{
          state.Total=actions.payload  
        },
        setRows:(state, actions)=>{
            state.Rows=actions.payload
        }
    }
})
export const {setTotal, setRows} = productsSlice.actions
export default productsSlice.reducer