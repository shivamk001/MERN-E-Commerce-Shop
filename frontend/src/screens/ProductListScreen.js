import React, { useEffect, useState } from "react"
//import { Link, useLocation} from 'react-router-dom'
import { Button, Table, Row, Col} from 'react-bootstrap'
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
//import { listUsers } from "../actions/userActions"
import { ListProducts, deleteProduct, createProduct } from '../actions/productActions'
// import FormContainer from "../components/FormContainer";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import {LinkContainer} from 'react-router-bootstrap'
import Paginate from "../components/Paginate";

const ProductListScreen=()=>{
    const match=useParams()
    const pageNumber=match.pageNumber || 1
    console.log('In ProductListScreen')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    //const location=useLocation()
    const productList=useSelector(state=>state.productList)
    const {loading, error, products, page, pages }=productList
    console.log('USERS:', products)
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const productCreate=useSelector(state=>state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct }=productCreate

    const productDelete=useSelector(state=>state.productD)
    const {loading: loadingDelete, error: errorDelete, success: successDelete }=productDelete

    //console.log('LOGIN SEARCH',location.search, redirect)
    useEffect(()=>{

        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
            //dispatch(ListProducts())
        }
        if(successCreate){
          navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
          dispatch(ListProducts('',pageNumber))
        }
    },[navigate, dispatch, userInfo, successDelete, successCreate, createProduct, pageNumber])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure')){
          deleteProduct(id)
        }
    }

    const createProductHandler=()=>{
      dispatch(createProduct())
    }

    return  <>
        <Row className='align-items-center'>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler()}>
              <i className='fas fa-plus'></i>
              Create Product
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading? <Loader/> : error?<Message variant='danger'>{error}</Message>:(
            <>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page}/>
          </>
        )}
    </>
}
export default ProductListScreen