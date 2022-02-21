import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../../api/userApi'
import { StorageKeys } from "../../constant/storageKey";

export const register = createAsyncThunk('auth/register', async (payload) => {
    //call API 
    try {
        const data = await userApi.register(payload)
        const result = {
            data: data.msg,
            status: 1
        }
        return result
    } catch (err) {
        const result = {
            data: err.response.data.msg,
            status: 0
        }
        return result
    }
})
export const login = createAsyncThunk('auth/login', async (payload) => {
    //call API Auth
    try {
        const res = await userApi.login(payload);
        if (!res.accesstoken) {
            return res;

        }
        localStorage.setItem(StorageKeys.TOKEN, res.accesstoken);
        const data = await userApi.getProfile()
        const user = {
            name: data.name,
            _id: data._id,
            email: data.email,
            address: data?.address,
            phone: data?.phone,
            role: data.role,
            cart: data?.cart
        }
        //save data
        localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
        return data;
    } catch (err) {
        console.log(err.response.data.msg)
        return err.response.data.msg
    }

})

export const logout = createAsyncThunk('auth/logout',async(payload)=>{
    //call Api
    try {
        const data = await userApi.logout()
        const result = {
            data: data.msg,
            status: 1
        }
        return result
    } catch (err) {
        const result = {
            data: err.responsedata.msg,
            status: 0
        }
        return result
    }
})

export const addToCart = createAsyncThunk('user/addtocart',async(payload)=>{
    try {
        
        const data = await userApi.addToCart(payload)
        const result = {
            msg: data.msg,
            data: data.data,
            status: 1
        }
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data))
        return result
        
    } catch (err) {
        const result = {
            data: err.responsedata.msg,
            status: 0
        }
        return result
    }
})

const initialState = {
    modalIsOpen: false,
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || null,
    cartCurrent: JSON.parse(localStorage.getItem(StorageKeys.USER))?.cart || null,
    
};

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalIsOpen = true;
        },
        closeModal: (state) => {
            state.modalIsOpen = false;
        },
        change: (state, action) => {
            state.current = action.payload;
            localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload))
        },
        // addToCart: (state, action)=>{
        //     //newItem = {id,qty}
        //     const newItem = action.payload
        //     if(!state.cartCurrent) state.cartCurrent = []
        //     const index = state.cartCurrent.findIndex((item)=> item._id===newItem._id)
        //     if(index>=0)state.cartCurrent[index].quantity = newItem.quantity

        // }   
       
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            const user = {
                _id: action.payload._id,
                email: action.payload.email,
                name: action.payload.name,
                address: action.payload.address,
                phone: action.payload.phone,
                role: action.payload.role,
                cart: action.payload.cart,
                token: localStorage.getItem(StorageKeys.TOKEN),
                createdAt: action.payload.createdAt,
                updatedAt:action.payload.updatedAt,
                
                isAdmin: action.payload.role === 1 ? true : false || false,
                isLogged: action.payload.role === 0 || action.payload.role === 1 ? true : false || false,
                
            }
            state.current = user
        },
        [logout.fulfilled]: (state,action)=>{
            state.current = null;
            localStorage.removeItem(StorageKeys.TOKEN)
            localStorage.removeItem(StorageKeys.USER)
        },
        [addToCart.fulfilled]: (state,action)=>{
            state.current = JSON.parse(localStorage.getItem(StorageKeys.USER)) || null
        }
        // [register.rejected]: (state, action) => {
        //     state.errorMessage = action.payload.msg;
        // }
    }
})

export const { openModal, closeModal, change } = userSlice.actions

export default userSlice.reducer;