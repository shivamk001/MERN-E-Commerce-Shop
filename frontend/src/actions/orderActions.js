import axios from 'axios'
import {
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST, 
    ORDER_LIST_MY_SUCCESS, 
    ORDER_LIST_MY_FAIL,
    } from '../constants/orderConstants'

export const createOrder=(order)=>async(dispatch, getState)=>{
    console.log('In CreateOrder')
    console.log('ORDER:',order)
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin }=getState()
        console.log('USERINFO:',userLogin)
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLogin.userInfo.token}`,
            }
        }
        console.log('CONFIG in getUserDetails:', config)
        const {data}=await axios.post(`http://127.0.0.1:5000/api/orders`, order, config)
        console.log('ORDER CREATED:',data)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const getOrderDetails=(id)=>async(dispatch, getState)=>{
    console.log('In OrderDetails')
    console.log('ID:',id)
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const { userLogin }=getState()
        console.log('USERINFO:',userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userLogin.userInfo.token}`,
            }
        }
        console.log('CONFIG in getOrderDetails:', config)
        const {data}=await axios.get(`http://127.0.0.1:5000/api/orders/${id}`, config)
        console.log('ORDER DETAILS:',data)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const payOrder=(orderId, paymentResult)=>async(dispatch, getState)=>{
    console.log('In payOrder')
    console.log('ID:',orderId)
    try{
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin }=getState()
        console.log('USERINFO:',userLogin)
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLogin.userInfo.token}`,
            }
        }
        console.log('CONFIG in getOrderDetails:', config)
        const {data}=await axios.put(`http://127.0.0.1:5000/api/orders/${orderId}/pay`, paymentResult, config)
        console.log('ORDER PAY:',data)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const listMyOrders=()=>async(dispatch, getState)=>{
    console.log('In listMyOrders')
    
    try{
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        })

        const { userLogin }=getState()
        console.log('USERINFO:',userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userLogin.userInfo.token}`,
            }
        }
        console.log('CONFIG in getOrderDetails:', config)
        const {data}=await axios.get(`http://127.0.0.1:5000/api/orders/myorders`, config)
        console.log('ORDER LIST:',data)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}