//import products from '../products'
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { ListProducts } from '../actions/productActions.js'
import { useParams} from 'react-router-dom'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
//import axios from 'axios'
const HomeScreen = () => {
  const match=useParams()
  console.log('MATCH:', match)
  //console.log('MATCH PARAMS:', match.params)
  const keyword=match.keyword
  const pageNumber=match.pageNumber || 1
  const dispatch=useDispatch()
  const productList=useSelector(state=>state.productList)
  const {loading,error,products, page, pages}=productList

  useEffect(()=>{
    console.log('KEYWORD:',keyword)
    dispatch(ListProducts(keyword, pageNumber))
  },[dispatch, keyword, pageNumber])
  return (
    <>
    <Meta/>
    {!keyword? <ProductCarousel/>: <Link to='/' className='btn btn-light'>Go Back</Link>}
    <h1>Latest products</h1>
    {loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):
    (<>
    <Row>
      {products.map(product=>(
          <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product}/>
          </Col>
      ))}
    </Row>
    <Paginate pages={pages} page={page} keyword={keyword?keyword:''}/>
    </>
    )}

    </>
  )
}

export default HomeScreen