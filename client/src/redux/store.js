import {createSlice,configureStore} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLogin:false,

    },
    reducers:{
        login(state){                         ////actions
            state.isLogin=true
        },
        logout(state){
            state.isLogin=false
        }
    }
})

export const authActions=authSlice.actions;    ////store

export const store=configureStore({
    reducer:authSlice.reducer
})