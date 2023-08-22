import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom'
const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [catagory, setCatagory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate  = useNavigate();

    const addProduct = async () => {
        console.warn(name, price, catagory, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, catagory, company }),
            headers: {
                'content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.warn(result);
        navigate('/');
    }

    useEffect(() => {
        getProductDetails();
    });

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCatagory(result.catagory);
        setCompany(result.company)

    }

    return (
        <div className="product">
            <h1>Update product...</h1>
            <input type='text' className='inputBox' value={name}
                onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product name' />

            <input type='text' className='inputBox' value={price}
                onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />

            <input type='text' className='inputBox' value={catagory}
                onChange={(e) => { setCatagory(e.target.value) }} placeholder='Enter Product Catagory' />

            <input type='text' className='inputBox' value={company}
                onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Brand' />

            <button onClick={addProduct} className='Button'>Add this product</button>
        </div>
    )
}

export default UpdateProduct;