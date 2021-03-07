import React, { useState, useRef } from 'react'
import logo from './logo.png'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Email, User, Password } from './Icons/HeroIcons'
import { RegisterDispatch, NotGoodRequest } from './RegisterDispatch'


//Regex
function validateUsername(username){
  const usernameRegex = new RegExp(/^([A-Za-z0-9]){4,20}$/m);
  return usernameRegex.test(username);
}

function validateEmail(email){
  var emailRegex = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/m;
  return emailRegex.test(email);
};

export const Register = () => {
  const [user, setUser] = useState({username:'',name:'', password:'', email:''})
  const [isValidUsername, setIsValidUsername] = useState()
  const [isValidName, setIsValidName] = useState()
  const [isValidEmail, setIsValidEmail ] = useState()
  const [isRequestGood, setIsRequestGood] = useState()
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(e);
    console.log(user);
    // Send a POST request
    if(isValidEmail && isValidName && isValidUsername){
      axios({
        method: "post",
        url: "http://localhost:4000/user/register",
        data: {
          ...user,
        },
      }).then((response)=>{
        console.log(response);
        window.location.href ='/login';
      }).catch((error)=>{
        setIsRequestGood(false);
        setShowModal(true)
        console.log(error.response);
      });
    }else{
      setIsValidEmail(validateEmail(user.email))
      setIsValidName(validateUsername(user.name))
      setIsValidUsername(validateUsername(user.username))
    }
  }
  const handleChange = (e)=>{
    const  value  = e.target.value;
    const  type  = e.target.name;
    //event.currentTarget
    switch(type){
      case 'name': setIsValidName(validateUsername(value));
      break;
      case 'username': setIsValidUsername(validateUsername(value));
      break;
      case 'email': setIsValidEmail(validateEmail(value));
      break;
      default: console.log(type);
      break;
    }
    setUser({...user, [type]:value})
  }
  const handleModalClick = (e)=>{
    e.preventDefault();
    setShowModal(false);
  }
  const conditionalRendering = ()=>{
    const msg = 'Please check fields, email or username is already in use.';
    if(showModal)
     return <NotGoodRequest onClick={handleModalClick} msg={msg}/>
  }
    return (
      <div className="flex flex-row-reverse min-h-full   bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className="bg-white w-full  md:w-1/3">
              <div className="my-10 container">
                <h1 className="font-mono text-center text-5xl mb-5">Register</h1>
                <div className="mx-auto">
                  <img src={logo} className="mx-auto" alt="aa"></img>
                </div>
              </div>
            <div className="max-h-full mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-5">
                        <Input name="username"onChange={handleChange} type="text"label_name="Username:" placeholder="Username" value={user.username} show={isValidUsername}/>
                        <Input name="name" onChange={handleChange} type="text" label_name="Name:" placeholder="Name" value={user.name} show ={isValidName}/>
                        <Input name="email" onChange={handleChange} type="text" label_name="Email:" placeholder="Email" value={user.email} show ={isValidEmail}/>
                        <Input name="password" onChange={handleChange}type="password" label_name="Password:" placeholder="Password" value={user.password}/>
                        <div className="mx-5"> 
                        <Link to={'/login'}>
                          <span className=" text-red-600 hover:text-red-800 border-b border-red-800">Already have an account? Log in.</span>
                        </Link>
                        </div>
                    </div>
                      {conditionalRendering()}
                    <div className="my-8 flex justify-center">
                      <button type="submit" className="transition duration-200 rounded-full py-4 px-12 bg-yellow-300 focus:outline-none hover:bg-yellow-500 focus:ring-yellow-800 focus:ring-2 focus:ring-opacity-50" onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
}
export const Input = ({name,onChange, label_name, placeholder, value, type, show})=>{
  const [isClicked, setIsClicked] = useState(false);
  
  let input = useRef(null)
  const handleClick = (e)=>{
    setIsClicked(!isClicked);
  }
  const renderSwitch = (placeholder) =>{
    switch(placeholder){
      case 'Password': return <Password/>
      case 'Email': return <Email/>
      default: return <User/>
    }
  }

  return(
    <div className="flex flex-col py-3">
      <label className="mx-5">{label_name}</label>
      <div className={"flex flex-row items-center mx-5 border-b-2 border-red-600 focus:outline-none " + (isClicked ? " border-yellow-200 " : " ")} >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#b3b3b3" onClick={()=>{input.current.focus()}} height="18px" width="18px">
        {renderSwitch(placeholder)}
        </svg>
          <input ref={input} className="focus:outline-none  py-4 w-full mx-2 " type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} onFocus={handleClick} onBlur={handleClick} />
        </div>
        {<RegisterDispatch show={show} placeholder={placeholder} value={value}/>}
      </div>
    )
}
