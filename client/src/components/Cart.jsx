import axios from 'axios'
import React,{ useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import productImage from './download.png'
const Cart = () => {
  const [cart,setCart] = useState([])
  const [product,setProduct] = useState([])
  const customerId = Cookies.get('customerId');
  useEffect (()=>{
    fetchProducts()
  },[])
  const fetchProducts = async ()=>{
      try {
        
        const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/cartShow?customerId=${customerId}`);
        setCart(res.data)
        console.log(cart)
        
      }catch(err){
        console.log(err)
      }
    }

    const addToOrder = async ()=>{
      try {
      
        const cartItem2 = {
          order_id : "try3", cust_id:customerId, tracking_merchant:"jaadoo_son",payment_status:"Incomplete",tracking_id:"mkbhd",cart_id:"hello"
        };
        console.log(cartItem2);
        await axios.post("https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/orderPost", cartItem2);
    } catch (err) {
      console.log(err);
      // setErrorMessage(err.response.data.error); // set error message from backend if the request fails
    }

    }
 
  return (
    <div>
      <div>
        <div className='text-4xl'>
        Cart of {customerId}
      </div>
      <div className='grid grid-cols-1 animate-slideUpCubiBezier animation-delay-2 space-y-5'>
      
        {
          cart.map(cart=>(
            <div className="flex mx-10 bg-white rounded-lg animate-slideUpCubiBezier animation-delay-2  shadow-md w-50 " key = {cart.p_id}>
              <img src={productImage} alt="Product" className=" object-cover" />
              <div className="p-4">
              <h2 className="text-2xl font-bold mb-9 px-9">{cart.p_desc}</h2>
              <p className="text-gray-900 font-semibold mb-4">${cart.p_price}</p>
              <div className='flex justify-between space-x-5'>
              <div className='flex space-x-5 justify-start'>
              <button className =" bg-transparent hover:bg-blue-500 text-blue-800 font-bold hover:text-white py-2 px-4 border border-blue-500  rounded">
                Remove from cart
                </button>
              </div>
              <div className=''>
              <button className =" bg-transparent hover:bg-blue-500 text-blue-800 font-bold hover:text-white py-2 px-4 border border-blue-500  rounded">
                Increase Quantity
              </button>
              </div>
              <div className='flex justify-end'>
              <button className =" bg-transparent hover:bg-blue-500 text-blue-800 font-bold hover:text-white py-2 px-4 border border-blue-500  rounded">
                Decrease Quantity
              </button>
              </div>
              </div>
              </div>
      
                
            </div>
            // <div className='cart p-10' >

            //     <h2>{cart.product_id}</h2>
            //     <h2>{cart.p_desc}</h2>
            //     <h2>${cart.p_price}</h2>
            //     <h2>Total Stock Left</h2>
            //     <h3>{cart.p_quantiity}</h3>
            // </div>
          ))
        }
        </div>
        <div className='text-4xl my-4'>Total Cost $14586</div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white my-4 font-bold py-2 px-4 rounded' onClick={addToOrder}>Place Order</button>
        {/* <a href={"/orders"} className='bg-blue-500 hover:bg-blue-700 text-white my-4 font-bold py-2 px-4 rounded'>
          Place Order
        </a> */}
      </div>
    </div>
  )
}

export default Cart