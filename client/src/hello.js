import { React,useEffect,useState }  from 'react'
import axios from 'axios'

const Hello = () => {
    const [olap1,setolap1] = useState([])
    const [see1, setSee1] =  useState(false)
    const [see2, setSee2] =  useState(false)
    const [see3, setSee3] =  useState(false)
    const [see4, setSee4] =  useState(false)
    const button1 = () =>{
        setSee1(!see1)
    }
    const button2 = () =>{
        setSee2(!see2)
    }
    const button3 = () =>{
        setSee3(!see3)
    }
    const button4 = () =>{
        setSee4(!see4)
    }
    useEffect (()=>{
        fetchOlap1()
        fetchOlap2()
        fetchOlap3()
        fetchOlap4()

    },[])
    const fetchOlap1 = async ()=>{
        try {
            
            const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/olap1`);
            // console.log(res)
            setolap1(res.data)
            // console.log("hello")
            
        }catch(err){
            console.log(err)
        }
        }
    const [olap2,setolap2] = useState([])

    const fetchOlap2= async ()=>{
        try {
            
            const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/olap2`);
            // console.log(res)
            setolap2(res.data)
            // console.log("hello")
            
        }catch(err){
            console.log(err)
        }
        }
    const [olap3,setolap3] = useState([])
    
  
    const fetchOlap3 = async ()=>{
        try {
            
            const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/olap3`);
            // console.log(res)
            setolap3(res.data)
            // console.log("hello")
            

        }catch(err){
            console.log(err)
        }
        }    
    const [olap4,setolap4] = useState([])
    
    const fetchOlap4 = async ()=>{
        try {
            
            const res =await axios.get(`https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/olap4`);
            // console.log(res)
            setolap4(res.data)
            // console.log("hello")
            

        }catch(err){
            console.log(err)
        }
        }        
        return (
            <div>
              <button onClick={button1}>{see1 ? 'Hide' : 'Show'} Olap-3</button>
              {see1 &&
                <table>
                  <thead>
                    <tr>
                      <th>CUST_ID</th>
                      <th>p_id</th>
                      <th>QUANTITY</th>
                      <th>PRICE</th>
                      <th>PRODUCT DESCRIPTION</th>
                      <th>CATEGORY NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {olap3.map((olap3) => (
                      <tr>
                        <td>{olap3.e_id}</td>
                        <td>{olap3.p_id}</td>
                        <td>{olap3.Quantity}</td>
                        <td>{olap3.Price}</td>
                        <td>{olap3.Product_DESC}</td>
                        <td>{olap3.Category_Name}</td>
                        <td className="font-bold">{olap1.Revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
              <button onClick={button2}>{see2 ? 'Hide' : 'Show'} Olap-2</button>
              {see2 &&
              <table>
                <thead>
                  <tr>
                    <th>order_id</th>
                    <th>order_cost</th>
                  </tr>
                </thead>
                <tbody>
                  {olap2.map((olap2) => (
                    <tr>
                      <td>{olap2.order_id}</td>
                      <td>{olap2.Order_Cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
}           
<button onClick={button3}>{see3 ? 'Hide' : 'Show'} Olap-3</button>
              {see3 &&
              <table>
                <thead>
                  <tr>
                    <th>e_id</th>
                    <th>p_id</th>
                    <th>Product_Name</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {olap1.map((olap1) => (
                    <tr>
                      <td>{olap1.e_id}</td>
                      <td>{olap1.p_id}</td>
                      <td>{olap1.Product_Name}</td>
                      <td className="font-bold">{olap1.Revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
}
            </div>
          );
}

export default Hello