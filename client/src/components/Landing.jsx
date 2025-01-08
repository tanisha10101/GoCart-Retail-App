import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import productImage from './download.png'
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';

import { useLocation } from 'react-router-dom';

const Landing = () => {
  const location = useLocation();
  const cust_id = new URLSearchParams(location.search).get('cust_id');
  const cust_name = new URLSearchParams(location.search).get('cust_name');
  console.log(cust_id)
  const [counts, setCounts] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleIncrement = (p_id) => {
  setCounts((prevCounts) => ({
    ...prevCounts,
    [p_id]: (prevCounts[p_id] || 0) + 1, // Increment the count for the given product id or set it to 1 if it doesn't exist
  }));
};

  const handleDecrement = (p_id) => {
    if (counts[p_id] > 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [p_id]: prevCounts[p_id] - 1, // Decrement the count for the given product id
      }));
    }
  };


  const [products,setProducts] = useState([])
  const [sorted, setSorted] = useState()
  
  useEffect (()=>{
    fetchProducts()
  },[])
  const fetchProducts = async ()=>{
      try {
        const res =await axios.get("https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/products")
        setProducts(res.data)

      }catch(err){
        console.log(err)
      }
    }

  const fetchSortedProducts= async ()=>{
      try {
        if(sorted) {
          fetchProducts()
          setSorted(false)
          
        }else{
        
        const res =await axios.get("https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/products/sortAsc")
        setProducts(res.data)
        setSorted(true)
        }
        

      }catch(err){
        console.log(err)
      }
    }
    const [quanText,setQuanText] = useState(false);
    

  const addToCart = async (p_id) => {
  try {
    const quantity = counts[p_id] || 0;
    if (quantity === 0) {
      setErrorMessage("Please select a quantity greater than zero"); // set error message if quantity is zero
    } else {
      const cartItem2 = {
        cart_id: "hello",
        cust_id: cust_id,
        p_id: p_id,
        quantity: quantity,
      };
      console.log(cartItem2);
      await axios.post("https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/cart", cartItem2);
    }
  } catch (err) {
    console.log(err);
    setErrorMessage(err.response.data.error); // set error message from backend if the request fails
  }
};
  return (
    <div className='bg-gray-800'>
      <div className='text-4xl text-white'>
        Browse Products {cust_name}
      </div>
      <div className='flex justify-end'>
      <button className =" bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
      onClick={fetchSortedProducts}>
        Sort By Price
      </button>
      </div>
      {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-5'>
        
        {
          products.map(products=>(
            
            <div className="flex mx-10 bg-white animate-slideUpCubiBezier animation-delay-2 rounded-lg shadow-md w-50 h-80" key = {products.p_id}>
              {/* <img src={productImage} alt="Product" className="w-full h-70 object-cover" /> */}
              <div className="p-5">
              <h2 className="text-lg font-semibold mb-11 px-11">{products.p_desc}</h2>
              <p className="text-gray-900 mb-2">${products.p_price}</p>
              <div className="flex items-center space-x-4">
                <div className='flex space-x-5 '>
                <button 
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  onClick={() => handleDecrement(products.p_id)}
                >
                  <div>
                    {products.p_quantiity}
                  </div>
                  <RiSubtractFill />
                </button>
                <span className="text-xl font-medium">{counts[products.p_id] || 0}</span>
                <button 
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  onClick={() =>handleIncrement(products.p_id)}
                >
                  <RiAddFill />
                </button>
              </div>

              <button onClick={()=>addToCart(products.p_id)} className="bg-blue-700 p-10 hover:bg-blue-700 text-white  py-3 px-5 rounded">
                Add to Cart
              </button>
              </div>
              </div>
      
                
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Landing