import React, {useState, useEffect} from "react";
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";

const Crud = () => {
    const [isFilledFields, setIsFilledFields] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('')
    const handleNameChange = (e) => {
        setProduct(e.target.value)
        console.log(product, 'product')
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
        console.log(price, 'price')
    }
    useEffect(() => {
        checkFilledFields();
    }, [product, price]);

    const checkFilledFields = () => {
        setIsFilledFields(product.trim() !== '' && price.trim() !== '');
    }
    const handleAddTask = (e) => {
        e.preventDefault()
        if (isFilledFields) {
            console.log({product, price})
            setProduct('');
            setPrice('')
            navigate('/')
            const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
            const newBlog = {product, price};
            const updatedBlogs = [...existingBlogs, newBlog];
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        }
    }
    return (
        <div className={styles['container']}>
            <div className={styles['crud']}>
                <h1>
                    React Js Crud
                </h1>
                <div className={styles['cards']}>
                </div>
                <form>
                    <input type='text'
                           value={product} onChange={(e) =>
                        handleNameChange(e)} name='name'
                           placeholder='Enter Product'/>
                    <input type='text'
                           value={price} onChange={(e) =>
                        handlePriceChange(e)} name='price'
                           placeholder='Enter Price'/>
                    <button
                        onClick={handleAddTask}
                        disabled={!isFilledFields}
                        type='submit'>Send
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Crud;
