import React, { useEffect, useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { ListProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen=()=>{
    const productId=''
    const [name, setName]=useState('')
    const [price, setPrice]=useState(0)
    const [image, setImage]=useState('')
    const [brand, setBrand]=useState('')
    const [category, setCategory]=useState('')
    const [countInStock, setCountInStock]=useState(0)
    const [description, setDescription]=useState('')
    const [uploading, setUploading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()

    const productDetails=useSelector(state=>state.productDetails)
    const {loading, error, product}=productDetails

    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate}=productUpdate

    // const productUpdate=useSelector((state)=>state.userUpdate)
    // const {loading: loadingUpdate, error: errorUpdate, success: successUpdate}=userUpdate
    // const userId=location.search?location.search.split('=')[1]:'/'
    //console.log('LOGIN SEARCH',location.search, redirect)
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate(`/admin/productlist`)
        }
        else{
        if(!product.name || product._id!==productId){
            dispatch(ListProductDetails(productId))
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
        }
    },[product, dispatch, productId, successUpdate, navigate])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image, 
            brand,
            category,
            description,
            countInStock
        }))
    }

    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file)
        console.log('FORMDATA:', formData)
        setUploading(true)

        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
           const {data}=await axios.post('http://127.0.0.1:5000/api/upload',formData, config)
           setImage(data)
           setUploading(false)
        }
        catch(error){
            console.error(error)
            setUploading(false)
        }
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder="Enter Name" value={name} 
                        onChange={(e)=>setName(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder="Enter Price" value={price} 
                        onChange={(e)=>setPrice(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder="Enter Image" value={image} 
                        onChange={(e)=>setImage(e.target.value)}>
                    </Form.Control>
                    <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>
                    </Form.File>
                    {uploading && <Loader/>}
                </Form.Group>
                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder="Enter Brand" value={brand} 
                        onChange={(e)=>setBrand(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder="Enter Image" value={category} 
                        onChange={(e)=>setCategory(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' placeholder="Enter Count In Stock" value={countInStock} 
                        onChange={(e)=>setCountInStock(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder="Enter Image" value={description} 
                        onChange={(e)=>setDescription(e.target.value)}>
                        </Form.Control>
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

export default ProductEditScreen