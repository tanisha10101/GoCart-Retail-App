import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 const handleLogin = async (event) => {
  event.preventDefault();
  console.log('Logging in...');

  try {
    const response = await axios.post('https://arnagupta2003-miniature-cod-w4695pgqqpvcg94g-3001.preview.app.github.dev/login', { username, password });
    // console.log('Response:', response);
    const cust_id  = response.data.cust_id
    const cust_name = response.data.cust_name
    Cookies.set('customerId', cust_id, { expires: 7 });
    console.log(Cookies.get('customerId'))
        // console.log(response.data.cust_id)
    
    // const { cust_id } = response.data;
    // console.log('Cust ID:', cust_id);
    // onLogin(cust_id);
    navigate(`/landing?cust_id=${cust_id}&cust_name=${cust_name}`);
  } catch (error) {
    console.log('Error:', error);
    setErrorMessage(error.response.data.message);
  }
};

//SXg9ZxSXF6vi
//kplacstone2e
  return (
    <form className="bg-purple-500 py-8 px-4 sm:px-6 lg:px-8 min-h-screen" onSubmit={handleLogin}>
  <div className="max-w-md mx-auto">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-white">Login</h2>
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
    </div>
    <div className="mt-6">
      <label htmlFor="username" className="block text-white text-sm font-medium mb-2">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="appearance-none bg-white rounded-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="appearance-none bg-white rounded-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button type="submit" className="w-full bg-white rounded-full py-2 px-4 text-purple-500 font-medium hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50">Login</button>
    </div>
  </div>
</form>

  );
};

export default Login;
