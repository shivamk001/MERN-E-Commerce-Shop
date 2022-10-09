import React, { useEffect, useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login, register } from "../actions/userActions"
import FormContainer from "../components/FormContainer";

const RegisterScreen=()=>{
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setconfirmPassword]=useState('')
    const [message, setMessage]=useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading, error, userInfo}=userRegister
    const redirect=location.search?location.search.split('=')[1]:'/'
    //console.log('LOGIN SEARCH',location.search, redirect)
    useEffect(()=>{
        if(userInfo){
            //console.log('REDIRECT:',redirect)
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(name, email, password)
        if(password!==confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name, email, password))
        }
        
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>name</Form.Label>
                    <Form.Control type='name' placeholder="Enter Name" value={name} 
                        onChange={(e)=>setName(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter Email" value={email} 
                        onChange={(e)=>setEmail(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter Password" value={password} 
                        onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder="Confirm Password" value={confirmPassword} 
                        onChange={(e)=>setconfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='secondary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account?{' '}<Link to={redirect?`/register?redirect=${redirect}`:`/register`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen