import React, {useState, useEffect} from 'react'
import { Form, Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router";
import {Row, Col, Image, ListGroup, ListGroupItem, Button, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import { ListProductDetails, createProductReview} from '../actions/productActions.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
//import products from '../products'
//import axios from 'axios'

const ProductScreen = ({history}) => {
    const [qty,setQty]=useState(1)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState('')
    const match=useParams()
    //console.log('MATCH in productscreen:', match)
    //const product=products.find(p=>p._id===match.id)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    console.log('Product:', product, match.id)
    console.log('ProductDetails:', productDetails)
    const productCreateReview=useSelector(state=>state.productCreateReview)
    const {success:successProductReview,error:errorProductReview}=productCreateReview

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    console.log('USERLOGIN:', userLogin)
    console.log('USERINFO:', userInfo)
    useEffect(()=>{
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
            console.log('DISPATCH LISTPRODUCTDETAILS IS CALLED:',match.id)
        }
        console.log('MATCH ID:', match.id)
        dispatch(ListProductDetails(match.id))
    },[dispatch, match, successProductReview])

    const addToCartHandler=()=>{
        console.log("MATCH.ID QTY:", match.id, qty)
        navigate(`/cart/${match.id}?qty=${qty}`)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.id, {rating, comment}))
    }
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
    (   <>
        <Meta title={product.name}/>
        <Row>
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
        </Row>
    <Row>
        <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length===0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map(review=>{
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating}/>
                        <p>{review.createdAt.substring(0,10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                })}
                <ListGroup.Item>
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                    <h2>Write a Customer Review</h2>
                    {//userInfo?
                        /*(<Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                            <Button
                              type='submit'
                              variant='primary'
                            >
                              Submit
                            </Button>
                          </Form>)*/
                        /*<Message><Link to='/login'>Sign in</Link> to write a review {' '}</Message>*/}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    </Row>
    </>)
    }
    </>
  )
}

export default ProductScreen