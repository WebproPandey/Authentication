import React, { useState } from "react";
import { toast } from "react-toastify";
import  axios from  "axios"
import { useNavigate ,Link} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();


    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const  copySignup = {...signupInfo}
        copySignup[name] = value;
        setSignupInfo(copySignup)
      };
      
      
      const handlerSignup = async (e) => {
        e.preventDefault();
        const {name , email ,password} =  signupInfo
        if(!name || !email || !password){
            return toast.error("All field is  Requaired !")
        }
        try {
             const  url =  "http://localhost:5000/auth/signup";
             const response = await axios.post(url, signupInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSignupInfo({
                name: "",
                email: "",
                password: ""
            })
            toast.success("Signup successful!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
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
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <button className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handlerSignup} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
             onChange={handleChange}
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your name"
              autoFocus
              name="name"
              value={signupInfo.name} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
            onChange={handleChange}
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              autoFocus
              name="email"
              value={signupInfo.email} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
            onChange={handleChange}
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
              autoFocus
              name="password"
              value={signupInfo.password} 
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
