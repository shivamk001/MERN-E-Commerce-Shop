import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router";
import {Row, Col, Image, ListGroup, ListGroupItem, Button, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { ListProductDetails } from '../actions/productActions.js'
//import products from '../products'
//import axios from 'axios'

const ProductScreen = ({history}) => {
    const [qty,setQty]=useState(1)
    const match=useParams()
    //console.log('MATCH in productscreen:', match)
    //const product=products.find(p=>p._id===match.id)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    useEffect(()=>{
        console.log('DISPATCH LISTPRODUCTDETAILS IS CALLED:',match.id)
        dispatch(ListProductDetails(match.id))
    },[dispatch, match])

    const addToCartHandler=()=>{
        console.log("MATCH.ID QTY:", match.id, qty)
        navigate(`/cart/${match.id}?qty=${qty}`)
    }
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
    (<Row>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        
        <Col md={3}>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={Number(product.rating)} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: ${product.description}
                </ListGroup.Item>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price</Col>
                        <Col><strong>${product.price}</strong></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock>0?'In Stock':'Out of Stock'}</Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock>0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Qty
                            </Col>
                            <Col>
                                <FormControl as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map(
                                            (x)=>(<option key={x+1} value={x+1}>{x+1}</option>)
                                        )
                                    }
                                </FormControl>
                            </Col>
                        </Row>
                    </ListGroup.Item>)}
                <ListGroupItem>
                    <Col><Button variant="secondary" size="lg" onClick={addToCartHandler} disabled={product.countInStock===0}>Add To Cart</Button></Col>
                </ListGroupItem>
            </ListGroup>
        </Col>
    </Row>
    </Row>)
    }
    </>
  )
}

export default ProductScreen