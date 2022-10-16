import React, { useEffect, useState } from "react"
//import { useLocation } from 'react-router-dom'
import { Table, Form, Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions";

//import FormContainer from "../components/FormContainer";

const ProfileScreen = () => {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setconfirmPassword]=useState('')
    const [message, setMessage]=useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    //const location=useLocation()

    const userDetails=useSelector(state=>state.userDetails)
    const {loading, error, user}=userDetails
    console.log('UserDetails in ProfileScreen:', user)

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    console.log('UserLogin in ProfileScreen:', userLogin)

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile
    console.log('UserUpdateProfile in ProfileScreen:', userUpdateProfile)

    const orderMyList=useSelector((state)=>state.orderMyList)
    const {orders, loading: loadingOrders, error: errorOrders}= orderMyList

    //console.log('LOGIN SEARCH',location.search, redirect)
    useEffect(()=>{
        if(!userInfo){
            //console.log('REDIRECT:',redirect)
            navigate('/login')
        }
        else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, navigate, userInfo, user])

    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(name, email, password)
        if(password!==confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return (
    <Row>
        <Col md={3}>
            <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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
                    Change
                </Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders? <Loader/>: errorOrders?
                <Message variant='danger'>{errorOrders}</Message>:
                (<Table stripped bordered hover response className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.isPaid?order.paidAt.substring(0,10):(<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                    <td>{order.isDelivered?order.delieveredAt.substring(0,10):(<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                    <td>
                                        <LinkContainer className='btn-sm' to={`/order/${order._id}`}>
                                            <Button variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>)
                }
        </Col>
    </Row>
    )
}

export default ProfileScreen