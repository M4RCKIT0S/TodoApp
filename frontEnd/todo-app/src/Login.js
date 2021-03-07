import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import logo from './logo.png'
import { Input } from './Register'
import { NotGoodRequest } from './RegisterDispatch'
import UserContext from './UserDispatch'

//Regex
function validateUsername(username){
  const usernameRegex = new RegExp(/^([A-Za-z0-9]){4,20}$/m);
  return usernameRegex.test(username);
}
export const Login = (props) => {
  const [userValue, setUser] = useState({username:'', password:''})
  const [isValidUsername , setIsValidUsername] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(isValidUsername){
      axios({
        method: "POST",
        url: 'http://localhost:4000/user/login',
        data:{
          ...userValue
        }
      }).then((res)=>{
        let {data} = res;
        localStorage.setItem('token_id', data.token);
        //dispatch({type: 'login', text: data})
        console.log(localStorage)
        setShowModal(false);
        <Redirect to={'/dashboard'}/>
      }
      ).catch((error)=>{
        setShowModal(true)
      })
    }
  }
  const handleChange = (e)=>{
    const value = e.target.value
    const type = e.target.name

    if(type==="username"){
      setIsValidUsername(validateUsername(value))
    }
    setUser({...userValue, [type]:value})
  }
  const handleModalClick = (e)=>{
    e.preventDefault();
    setShowModal(!showModal)
  }



    return (
        <div className="flex flex-row-reverse min-h-full   bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">  
            <div className="bg-white w-full  md:w-1/3">
            <div className="my-10 container">
                <h1 className="font-mono text-center text-5xl mb-5">Login</h1>
                <div className="mx-auto">
                  <img src={logo} className="mx-auto" alt="aa"></img>
                </div>
              </div>
              <div className="max-h-full mb-8">
                <form onSubmit={handleSubmit}> 
                  <div className="flex flex-col mx-5"> 
                    <Input name="username" onChange={handleChange} label_name="Username:" placeholder="Username" value={userValue.username} type="text"></Input>
                    <Input name ="password" onChange={handleChange} label_name="Password:" placeholder="Password" value={userValue.password} type="password"></Input>
                    <div className="mx-5">
                    <Link to={'/SignUp'}><span className=" text-red-600 hover:text-red-800 border-b border-red-800">Don't have an account? Register here.</span></Link>
                    </div>
                  </div>
                  {showModal && <NotGoodRequest onClick={handleModalClick} msg={'Wrong username or password!'}/>}
                  <div className="my-8 flex justify-center">
                      <button type="submit" className="transition duration-200 rounded-full py-4 px-12 bg-yellow-300 focus:outline-none hover:bg-yellow-500 focus:ring-yellow-800 focus:ring-2 focus:ring-opacity-50" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
              </div>
            </div>
        </div>
    )
}
