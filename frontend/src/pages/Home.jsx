import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
   const navigate = useNavigate()
  const [loggedInUser , SetLoggedInUser] = useState('')
  const [products, setProducts] = useState([]); 

   useEffect(() =>{
      SetLoggedInUser(localStorage.getItem("loggedInUser"))
   },[])

   const handleLogout = async (e) =>{
     localStorage.removeItem("token");
     localStorage.removeItem("loggedInUser")
     toast.success("User Logout Successfuliy")
     setTimeout(() =>{
        navigate("/")
     },1000)
   }

  const allProduct  = async ()=>{
    try {
        const  url =  "http://localhost:5000/product";
        const response = await axios.get(url, {
           headers: {
              'Authorization':localStorage.getItem('token')
           },
       })
       setProducts(response.data); 
      
    } catch (error) {
        toast.error(error ||"Something is Wrong" )
        
    }
  }

   useEffect(() =>{
    allProduct()
   },[])

  return (
    <div className=' px-4 py-3'>
      <div className='flex justify-between'>
       <div>{loggedInUser}</div>
       <div onClick={handleLogout} className=' text-white cursor-pointer  bg-black  px-4  py-2'>Logout</div>
     </div>
     {products.length > 0 ? (
        products.map((value, key) => (
          <div key={key} className=''>
            <h1 className=''>{value.name}</h1>
            <h1 className=''>{value.age}</h1>
          </div>
        ))
      ) : (
        <div>No products to display</div>
      )}
     
    </div>
  )
}

export default Home