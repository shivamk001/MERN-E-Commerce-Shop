import axios from 'axios'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from '../constants/productConstants'

export const ListProducts=()=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data}=await axios.get('http://127.0.0.1:5000/api/products')
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