import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const navigate  = useNavigate()
    const [logininfo, setLoginInfo] = useState({
        email:"",
        password:""

    })

  const handleChange =  (e) =>{
    const { name, value } = e.target;
    const  copylogin = {...logininfo}
    copylogin[name] = value;
    setLoginInfo(copylogin)
  }


  const handlelogin = async (e) => {
    e.preventDefault();
    const { email ,password} =  logininfo
    if( !email || !password){
        return toast.error("All field is  Requaired !")
    }
    try {
         const  url =  "http://localhost:5000/auth/login";
         const response = await axios.post(url, logininfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setLoginInfo({
            email: "",
            password: ""
        })
        const {success  , message , token, name , error} =  response.data
        if(success){
            toast.success(message);
            localStorage.setItem('token' , token);
            localStorage.setItem('loggedInUser', name)
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }

       
        
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        if (error.response?.data?.error?.details) {
            const details = error.response.data.error.details;
            details.forEach(detail => {
                toast.error(detail.message || "Validation Error");
            });
        } else {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Login</h2>
          <button className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handlelogin} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              name="email"
              value={logininfo.email} 

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
              name="password"
              value={logininfo.password} 

            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
