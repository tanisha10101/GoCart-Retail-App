import express from "express";
import mysql2 from "mysql2"
import cors from "cors"
const main  =  express();
main.use(express.json())
main.use(cors())
// Product page

// database connection

const db = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345",
    database:"dbms_project"
})

main.get("/customers",(req,res)=>{
    const query = "SELECT * FROM customer"
    db.query(query,(err,data)=>{
        if(err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
    
})

main.get("/",(req,res)=>{
    res.json("backend pr hu bc")
})

main.get('/products/sortAsc',(req,res)=>{
    const query = "SELECT * FROM products ORDER BY p_price ASC"
    db.query(query,(err,data)=>{
        if (err) return res.json(err)
        else return res.json(data)
    })
})


// to post on cart
// main.post("/cart",(req,res)=>{
//     const query =  "INSERT INTO cart (cart_id, cust_id, product_id) VALUES (?, ?, ?)"
//     const productQuery = "SELECT p_quantiity FROM products WHERE p_id = ?";
//     const { cart_id, cust_id, p_id,quantity } = req.body
//     // console.log(cust_id)
//     // console.log(quantity)
//     const quan =0;
//     db.query (productQuery,[p_id]),(err,data)=>{
//         if(err){
//          console.log(err)
//             return console.log(err)};
//         console.log(data)
//     }
//     db.query (query,[cart_id,cust_id,p_id],(err,data)=>{
//         if(err) {
//             console.log(err)
//             return res.json(err)};
//         return res.json(data)
//     })
    
// })
main.post("/cart",(req,res)=>{
    const query = "INSERT INTO cart (cart_id, cust_id, product_id) VALUES (?, ?, ?)";
    const productQuery = "SELECT p_quantiity FROM products WHERE p_id = ?";
    const { cart_id, cust_id, p_id, quantity } = req.body;
    let quan = 0;
    db.query(productQuery, [p_id], (err, data) => {
        if (err) {
            console.log(err);
            return console.log(err);
        }
        quan = data[0].p_quantiity;
        console.log(quan);
        if (quantity > quan) {
            console.log("bohot zyada hai re baba")
            return res.status(400).json({ error: "Requested quantity is greater than available quantity" });
        }else{
            // while(quantity>0){
                db.query(query, [cart_id, cust_id, p_id], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    }
                    return res.json(data);
                    
                });
            // }
        }
        
    });
});

main.post("/orderPost",(req,res)=>{
    const query = "INSERT INTO delivery_tracking (order_id, cust_id, tracking_merchant,payment_status,tracking_id,cart_id) VALUES (?, ?, ?,?,?,?)";
    const { order_id, cust_id, tracking_merchant,payment_status,tracking_id,cart_id  } = req.body;
                db.query(query, [order_id, cust_id, tracking_merchant,payment_status,tracking_id,cart_id], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    }
                    return res.json(data);
                    
                });
            // }
        }
    );

main.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM customer WHERE user_name='${username}' AND password='${password}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const user = results[0];
        res.json({ cust_id: user.cust_id, cust_name: user.full_name });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  );
});

// main.post("/cart", async (req, res) => {
//     try {
//         const { cart_id, cust_id, p_id, quantity } = req.body;

//         const productQuery = "SELECT p_quantiity FROM products WHERE p_id = ?;";
//         const [productRows, fields] = await db.execute(productQuery, [p_id]);
//         const productQuantity = productRows[0].product_quantity;

//         if (quantity > productQuantity) {
//             return res.status(400).json({ error: "Requested quantity is greater than available quantity" });
//         }
//         const insertQuery = "INSERT INTO cart (cart_id, cust_id, product_id) VALUES (?, ?, ?)";
//         const [rows, fields2] = await db.execute(insertQuery, [cart_id, cust_id, p_id]);

//         return res.json(rows);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });

main.get("/cartShow",(req,res)=>{
    const { customerId } = req.query;
// console.log(customerId);
const query = "SELECT c.*, p.p_desc,p.p_quantiity,p.p_price FROM cart c JOIN products p ON c.product_id = p.p_id WHERE c.cust_id = ?";
db.query(query, [customerId], (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})

main.get("/orderShow",(req,res)=>{
    const { customerId } = req.query;
// console.log(customerId);
const query = "SELECT c.* FROM delivery_tracking c WHERE c.cust_id = ?";
db.query(query, [customerId], (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }else{
            console.log(data)
            return res.json(data)
        }
    })
})
main.get("/OLAP1",(req,res)=>{
    const q = "SELECT E.e_id, P.p_id, P.p_desc AS Product_Name, SUM(PL.total_cost) AS Revenue FROM eretailer E JOIN categories C ON E.e_id = C.e_id JOIN products P ON C.c_id = P.c_id JOIN cart CT ON P.p_id = CT.product_id JOIN delivery_tracking DT ON CT.cart_id = DT.cart_id JOIN payment_log PL ON DT.order_id = PL.order_id GROUP BY E.e_id, P.p_id, P.p_desc WITH ROLLUP ORDER BY E.e_id ASC, P.p_id ASC"
    db.query(q,(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})
main.get("/OLAP2",(req,res)=>{
    const q = "SELECT DT.order_id, SUM(PL.total_cost) AS Order_Cost FROM delivery_tracking DT  JOIN payment_log PL ON DT.order_id = PL.order_id GROUP BY (DT.order_id) WITH ROLLUP  ORDER BY Order_Cost DESC;"
    db.query(q,(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})
main.get("/OLAP3",(req,res)=>{
    const q = "SELECT c.cust_id, p.p_id, p.p_quantiity as Quantity, p.p_price as Price, p.p_desc as Product_DESC, cat.c_name as Category_Name  FROM customer c JOIN cart crt ON c.cust_id = crt.cust_id JOIN products p ON crt.product_id = p.p_id  JOIN categories cat ON p.c_id = cat.c_id  WHERE c.cust_id = 'XIQQ641376' GROUP BY c.cust_id, p.p_id, p.p_quantiity, p.p_price, p.p_desc, cat.c_name WITH ROLLUP  ORDER BY p.p_price DESC;"
    db.query(q,(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})
main.get("/OLAP4",(req,res)=>{
    const q = "SELECT DT.order_id, DT.cart_id, C.cust_id AS Cust_ID,DT.payment_status AS Payment_Status FROM    delivery_tracking DT   JOIN cart CT ON DT.cart_id = CT.cart_id   JOIN (SELECT DISTINCT cust_id FROM cart) C ON CT.cust_id = C.cust_id WHERE  DT.payment_status IN ('NOT PAID', 'PENDING') GROUP BY   DT.order_id,  DT.cart_id,  C.cust_id,  DT.payment_status WITH ROLLUP ORDER BY   DT.order_id ASC,   DT.cart_id ASC;"
    db.query(q,(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})

main.get("/productShow",(req,res)=>{
    const { productId } = req.query;
// console.log(customerId);
const query = "SELECT c.*, p.p_desc FROM cart c JOIN product p ON c.product_id = p.p_id WHERE c.cust_id = ?";
db.query(query, [productId], (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
            
        }else{
            return res.json(data)
        }
    })
})

// fetching products for localhost/products
main.get("/products",(req,res)=>{
    const query = "SELECT * FROM products"
    db.query(query,(err,data)=>{
        if(err){
            return res.json(err)
            console.log(err)
        }else{
            return res.json(data)
        }
    })
})


main.listen(3001,()=>{
    console.log("abhi bhi sunraha hu1")
})

/*
for adding to cart 

*/ 