import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword, setKeyword]=useState('')
    const navigate=useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        console.log('KEYWORD:', keyword)
        if(keyword.trim()){
            console.log('KEYWORD:', keyword.trim())
            navigate(`/search/${keyword.trim()}`)
        }
        else{
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col>
                    <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5'></Form.Control>
                </Col>
                <Col>
                    <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
                </Col>
            </Row>
            
        </Form>
    )
}

export default SearchBox