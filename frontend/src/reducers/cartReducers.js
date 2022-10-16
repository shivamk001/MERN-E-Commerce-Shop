import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants.js'

export const cartReducers=(state={cartItems:[], shippingAddress:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            console.log('ITEM:',item)
            console.log('CARTITEMS:', state, state.cartItems)
            const existItem=state.cartItems.find(x=>x.product===item.product)
            console.log('EXISTITEMS:',existItem)
            if(existItem){
                
                const ret={
                    ...state,
                    cartItems: state.cartItems.map(x=>x.product===existItem.product?item:x)
                }
                console.log('IF RET:',ret)
                return ret
            }
            else{
                console.log('IN ELSE')
                const ret={
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
                console.log('ELSE RET:', ret)
                return ret
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x=>x.product!=action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            const obj={
                ...state,
                shippingAddress: action.payload
            }
            console.log('CART_SAVE_SHIPPING_SDDRESS:',obj)
            return obj
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}