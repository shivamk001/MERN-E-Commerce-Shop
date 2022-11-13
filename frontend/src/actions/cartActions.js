import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants.js'

export const addToCart=(id, qty)=>async(dispatch, getState)=>{
    console.log('ID in ADDTOCART:', id)
    const {data}= await axios.get(`/api/products/${id}`)
    console.log('CART DATA:', data)

        dispatch({type: CART_ADD_ITEM,
            payload:{
                product: data._id,
                name: data.name,
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

export const saveShippingAddress=(data)=>async(dispatch)=>{
    console.log('DATA in SAVESHIPPINGADDRESS:',data)
    
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod=(data)=>async(dispatch)=>{
    console.log('DATA in SAVEPAYMENTMETHOD:',data)
    
    dispatch({type: CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}