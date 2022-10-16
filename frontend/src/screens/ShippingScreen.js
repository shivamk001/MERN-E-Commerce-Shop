import React, { useState } from "react"
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from '../actions/cartActions.js'
import CheckoutSteps from "../components/CheckoutSteps";


const ShippingScreen = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cart)
    const { shippingAddress }=cart
    console.log('ShIPPINGADDRESS:', shippingAddress)
    const [address, setAdress]=useState(shippingAddress.address)
    const [city, setCity]=useState(shippingAddress.city)
    const [postalCode, setpostalCode]=useState(shippingAddress.postalCode)
    const [country, setCountry]=useState(shippingAddress.country)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e)=>setAdress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
        
            <Form.Group controlId="address">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode}
                    onChange={(e)=>setpostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen