import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Link, useParams, useLocation } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'

const CartScreen = () => {
  const productId=useParams()
  const location=useLocation()
  //console.log('LOCATION in CartScreen:',location, productId)
  const qty=location.search?Number(location.search.split('=')[1]):1
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const cart=useSelector(state=>state.cart)
  const {cartItems}=cart
  console.log('CART:',cart)
  console.log('CARTITEMS:',cartItems)
  useEffect(()=>{
    if(productId){
      console.log('DISPATCH ADDTOCART IS CALLED: ',productId)
      dispatch(addToCart(productId.id, qty))
    }
  },[dispatch, productId, qty])

  const removeFromCartHandler=(id)=>{
    console.log('DISPATCH REMOVEFROMCART IS CALLED:',id)
    dispatch(removeFromCart(id))
    navigate(`/cart`)
  }

  const checkoutHandler=()=>{}
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0?<Message>Your cart is empty <Link to='/'>Go Back</Link></Message>:(
          <ListGroup variant='flush'>
            {cartItems.map(item=>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>Details</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target)))}>
                  {
                      [...Array(item.countInStock).keys()].map((x)=>(<option key={x+1} value={x+1}>{x+1}</option>))
                  }
                  </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button onClick={()=>removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>  
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,items)=>acc+items.qty,0)})</h2>
              ${cartItems.reduce((acc,item)=>acc+item.price,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed to checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen