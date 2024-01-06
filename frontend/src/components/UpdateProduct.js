import React, { useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:8080/product/${params.id}`,
            {
                method: 'Put',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
        result = await result.json()
        console.warn(result)
        navigate('/')

    }
    useEffect(() => {
        const getProductDetails = async () => {
            let result = await fetch(`http://localhost:8080/product/${params.id}`);
            result = await result.json();
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.company)

        };
        getProductDetails();
    }, [params.id])




    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input className='inputBox' type='text' placeholder='Enter Product Name'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input className='inputBox' type='text' placeholder='Enter Product Price'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />


            <input className='inputBox' type='text' placeholder='Enter Product Category'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />


            <input className='inputBox' type='text' placeholder='Enter Product Brand'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}
export default UpdateProduct;