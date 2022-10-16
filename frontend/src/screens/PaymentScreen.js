import React, { useState } from "react"
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import FormContainer from "../components/FormContainer";
import {savePaymentMethod} from '../actions/cartActions.js'
import CheckoutSteps from "../components/CheckoutSteps";


const PaymentScreen = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cart)
    const { shippingAddress }=cart
    
    if(!shippingAddress){
        navigate('/shipping')
    }
    const [paymentMethod, setpaymentMethod]=useState('Paypal')
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
    <CheckoutSteps step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check type='radio'
                    label='Paypal or Credit Cart'
                    id='Paypal'
                    name='paymentMethod'
                    value='Paypal'
                    checked
                    onChange={(e)=>setpaymentMethod(e.target.value)}
                >
                </Form.Check>
            </Col>
        </Form.Group>
        <Button type="submit" variant='primary'>
            Continue
        </Button>
    </Form>
</FormContainer>
  )
}

export default PaymentScreen