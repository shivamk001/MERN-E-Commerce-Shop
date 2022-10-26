import axios from 'axios'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,PRODUCT_TOP_SUCCESS,PRODUCT_TOP_FAIL,
} 
    from '../constants/productConstants'

export const ListProducts=(keyword='', pageNumber='')=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data}=await axios.get(`http://127.0.0.1:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        //console.log('DATA:',data)
        dispatch({type:PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch(error){
        //console.log('ERROR:',error)
        dispatch({type:PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message? error.response.data.message: error.message})
    }
}

export const ListProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`http://127.0.0.1:5000/api/products/${id}`)
        //console.log('DATA:',data)
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        //console.log('ERROR:',error)
        dispatch({type:PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message? error.response.data.message: error.message})
    }
}

export const deleteProduct=(id)=>async(dispatch, getState)=>{
    console.log('In DeleteProduct')
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in UpdateUsers:', config)
        await axios.delete(`http://127.0.0.1:5000/api/products/${id}`, config)
        //console.log('Updated USERS:',data)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const createProduct=()=>async(dispatch, getState)=>{
    console.log('In CreateProduct')
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in CreateUsers:', config)
        const {data}=axios.post(`http://127.0.0.1:5000/api/products`, {}, config)
        //console.log('Updated USERS:',data)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const updateProduct=(product)=>async(dispatch, getState)=>{
    console.log('In UpdateProduct')
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in UPDATEUsers:', config)
        const {data}=axios.post(`http://127.0.0.1:5000/api/products/${product._id}`, product, config)
        //console.log('Updated USERS:',data)
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const createProductReview=(productId, review)=>async(dispatch, getState)=>{
    console.log('In CreateProductReview')
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin:{userInfo}}=getState()
        //console.log(userLogin)
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        console.log('CONFIG in createProductReview:', config)
        await axios.post(`http://127.0.0.1:5000/api/products/${productId}/reviews`, review, config)
        //console.log('Updated USERS:',data)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}

export const listTopProducts=()=>async(dispatch, getState)=>{
    console.log('In ListTopProducts')
    try{
        dispatch({
            type: PRODUCT_TOP_REQUEST
        })

        const {data}=await axios.get('http://127.0.0.1:5000/api/products/top')
        console.log('DATA in LISTTOPPRODUCTS:', data)
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message: error.message
        })
    }
}