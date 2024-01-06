import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:8080/products');
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:8080/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) {
            getProducts()
        }

    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h1>ProductList</h1>
            <input type="text" className='search' placeholder="Search Product"
                onChange={searchHandle}
            />
            <ul className="product-header">
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Delete</li>
                <li>Update</li>
            </ul>
            {
                products.length>0?products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)} className="deleteButton">Delete</button></li>
                        <li> <Link to={"/update/" + item._id}className="updateLink">Update</Link></li>
                    </ul>
                ):<h1>No Product Found</h1>
            }
        </div>
    )
}

export default ProductList;