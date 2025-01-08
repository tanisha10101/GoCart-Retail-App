import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Cart from './components/Cart';
import Hello from './hello.js'
import Order from './/components/order'
// import Navbar from './components/Navbar';
import Login from './components/login'
function App() {
  return (
    <div className='p-10 App'>
      {/* <Navbar/> */}
      <br>
      </br>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element = {<Login/>}/>
        <Route path ="/landing" element = {<Landing/>}/>
        <Route path ="/cart" element = {<Cart/>}/>
        <Route path ="/olap1" element = {<Hello/>}/>
        {/* <Route path ="/olap2" element = {<Hello/>}/>
        <Route path ="/olap3" element = {<Hello/>}/>
        <Route path ="/olap4" element = {<Hello/>}/> */}
        <Route path ="/order" element = {<Order/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
