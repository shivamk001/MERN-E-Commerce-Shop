import axios from 'axios'
import {USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,
} from '../constants/userConstants.js'
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants.js'
export const login=(email, password)=>async(dispatch)=>{
    //console.log('In LoginAction')
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        //console.log(email, password, config)
        const {data}=await axios.post('http://127.0.0.1:5000/api/users/login', {email,password}, config)
        console.log(data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}

export const register=(name, email, password)=>async(dispatch)=>{
    console.log('In RegisterAction')
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        console.log(email, password, config)
        const {data}=await axios.post('http://127.0.0.1:5000/api/users', {name,email,password}, config)
        console.log(data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const getUserDetails=(id)=>async(dispatch, getState)=>{
    console.log('In UserDetails')
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in getUserDetails:', config)
        const {data}=await axios.get(`http://127.0.0.1:5000/api/users/${id}`, config)
        console.log('USERDETAILS:',data)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const updateUserProfile=(user)=>async(dispatch, getState)=>{
    console.log('In UserDetails')
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in getUserDetails:', config)
        const {data}=await axios.put(`http://127.0.0.1:5000/api/users/profile`, user, config)
        console.log('AFTER UPDATE:',data)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const listUsers=()=>async(dispatch, getState)=>{
    console.log('In ListUsers')
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in ListUsers:', config)
        const {data}=await axios.get(`http://127.0.0.1:5000/api/users`, config)
        console.log('LIST of USERS:',data)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const updateUser=(user)=>async(dispatch, getState)=>{
    console.log('In UpdateUser')
    try{
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in UpdateUsers:', config)
        const {data}=await axios.get(`http://127.0.0.1:5000/api/users/${user._id}`, user, config)
        console.log('Updated USERS:',data)
        dispatch({
            type: USER_UPDATE_SUCCESS,
        })
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const deleteUser=(id)=>async(dispatch, getState)=>{
    console.log('In DeleteUSER')
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in deleteUsers:', config)
        await axios.delete(`http://127.0.0.1:5000/api/users/${id}`, config)
        //console.log('Updated USERS:',data)
        dispatch({
            type: USER_DELETE_SUCCESS
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}