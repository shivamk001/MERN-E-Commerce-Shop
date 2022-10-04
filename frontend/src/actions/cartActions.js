import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants.js'

export const addToCart=(id, qty)=>async(dispatch, getState)=>{
    console.log('ID in ADDTOCART:', id)
    const {data}= await axios.get(`http://127.0.0.1:5000/api/products/${id}`)
    console.log('CART DATA:', data)

        dispatch({type: CART_ADD_ITEM,
            payload:{
                product: data._id,
                home: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>async(dispatch, getState)=>{
    console.log('ID in REMOVECART:',id)
    
    dispatch({type: CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}