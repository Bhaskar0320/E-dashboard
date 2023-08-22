import React from 'react';
import { useState } from 'react';
// import {useNavigate} from 'react-router-dom'
const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [catagory, setCatagory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    // const navigate  = useNavigate();
    const addProduct = async () => {
        console.warn(!name);
        if (!name || !price || !catagory || !company) {
            setError(true);
            return false;
        }
        console.warn(name, price, catagory, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, catagory, company, userId }),
            headers: {
                "content-Type": "application/json"
            }
        }).then( result.json());
        // result = await result.json();
        // console.warn(result);
    }

    return (
        <div className="product">
            <h1>Add your product here...</h1>
            <input type='text' className='inputBox' value={name}
                onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product name' />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type='text' className='inputBox' value={price}
                onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type='text' className='inputBox' value={catagory}
                onChange={(e) => { setCatagory(e.target.value) }} placeholder='Enter Product Catagory' />
            {error && !catagory && <span className='invalid-input'>Enter valid catagory</span>}

            <input type='text' className='inputBox' value={company}
                onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Brand' />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} className='Button'>Add this product</button>
        </div>
    )
}

export default AddProduct;