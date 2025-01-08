import axios from 'axios'
import React,{ useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';


  
const Order = () => {
    const [cart,setCart] = useState([])
  const [product,setProduct] = useState([])
  const customerId = Cookies.get('customerId');
  useEffect (()=>{
    fetchProducts()
  },[])
  const fetchProducts = async ()=>{
      try {
        
        const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/orderShow?customerId=${customerId}`);
        setCart(res.data)
        console.log(cart)
        
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div>
        
        {
          cart.map(cart=>(
            <div className="flex mx-10 bg-white rounded-lg animate-slideUpCubiBezier animation-delay-2  shadow-md w-50 " key = {cart.order_id}>
              <div className="p-4  hover:shadow-lg">
              <div className='flex space-x-5'>
                <p className="text-gray-900 font-bold mb-4">Order ID</p>
              <h2 className="text-2xl font-bold mb-9 px-9">{cart.order_id}</h2>
              </div>
              <div className='flex space-x-5'>
                <p className="text-gray-900 font-bold mb-4">Payment</p>
                <p className="text-gray-900 font-semibold mb-4">{cart.payment_status}</p>
                <p className="text-gray-900 font-bold mb-4">Delivery_merchant</p>
                <p className="text-gray-900 font-semibold mb-4">{cart.tracking_merchant}</p>
                <p className="text-gray-900 font-bold mb-4">Tracking ID</p>
                <p className="text-gray-900 font-semibold mb-4">{cart.tracking_id}</p>
                
                
              </div>
              <div className='flex justify-between space-x-5'>
              <div className='flex space-x-5 justify-start'>
              
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
  )
}

export default Order