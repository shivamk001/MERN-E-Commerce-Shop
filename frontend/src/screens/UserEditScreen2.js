import React, { useEffect, useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from "../actions/userActions"
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen=()=>{
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [isAdmin, setisAdmin]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const userDetails=useSelector(state=>state.userDetails)
    const {loading, error, user}=userDetails

    const userUpdate=useSelector((state)=>state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate}=userUpdate
    const userId=location.search?location.search.split('=')[1]:'/'
    //console.log('LOGIN SEARCH',location.search, redirect)
    useEffect(()=>{
        if(successUpdate){
            dispatch(USER_UPDATE_RESET)
            navigate('/admin/userList')
        }
        else{
        if(!user.name || user._id!==userId){
            dispatch(getUserDetails(userId))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setisAdmin(user.isAdmin)
        }
        }
    },[user, navigate, dispatch, userId, successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }
    return (
        <>
        <Link to='admin/userList' className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading?<Loader/>: error? <Message variant='danger'>{error}</Message>:
            (
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
                <Form.Group controlId="isAdmin">
                    <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e)=>setisAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>
                <Button type='submit' variant='secondary'>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen