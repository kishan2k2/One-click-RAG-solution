import { useEffect, useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword'
import axios from 'axios';
import usePost from './usePost';
const Login = ({setLogin}) => {
  const[signUp,setSignUp]=useState(false);
  const[forgotPass,setForgotPass]=useState(false);
  const [loginData,setLoginData]=useState({
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  function handleClick()
  {
   
    setSignUp(true);
   
   
  }

  const {message,handleSubmit}=usePost('http://127.0.0.1:8000/login/','Login');
  function onSubmitFunc(e)
  { 
    // e.preventDefault();
    handleSubmit(e, loginData,setLogin,null);
    
  }



 
  return (

    signUp?(
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
        <SignUp setSignUp={setSignUp} setLogin={setLogin} />
      </div>
    ):
    forgotPass?
    (
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
      <ForgotPassword setForgetPass={setForgotPass} />
    </div>
    ):
    setLogin?
    (
      <div className='flex justify-center'>
    
                
            
      <div className="flex justify-center w-[300px] h-[430px]  border-solid border-2 border-gray-800  rounded-md">
            <div className="flex flex-col gap-6 w-[100%] h-[100%] text-[#111827] p-6 bg-white rounded-md ">
              <div className=" flex justify-between">
                <div className="flex justify-start gap-2 items-center">
                  <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
                  <h3 className="font-semibold text-lg ">RAG</h3>
                </div>
                <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={()=> setLogin(false)}>X</button>
              </div>
              <div className="font-bold text-xl flex flex-col justify-center items-center">
                <p className='italic'>Hello</p>
                <p>Welcome!</p>
              </div>
              <form  onSubmit={onSubmitFunc}>
                <div className="flex flex-col gap-2 justify-center items-center bg-[#111827] text-white p-4 rounded-xl">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="">userName</label>
                    <input type="text" className="rounded-md text-black  pl-2 pr-2 "  placeholder='Enter your name' name='userName' value={loginData.userName} required onChange={handleChange}/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Password</label>
                    <input type="password" className="rounded-md  text-black  pl-2 pr-2 "  placeholder='Enter a password' name='password' value={loginData.password} required onChange={handleChange}/>
                    <button className='text-white text-[12px] ml-24 ' onClick={()=> setForgotPass(true)}>forget password?</button>
                  </div>
                  <div className='w-[90%] bg-gray-300 rounded-md flex justify-center mt-2 p-1'>
                    <button type="submit" className='text-[#18181b] font-semibold w-[100%]'>Login</button>
                  </div>
                 
                </div>
              </form>
              <div className='flex justify-center gap-1 text-[#18181b] mt-[-8px] text-sm'>
                      <p >Don't have an account? </p>
                      <button className='font-semibold' onClick={handleClick} >Sign Up</button>
              </div>
            </div>
          </div>
         </div>
    ):
    (
     ""
    )
  
  );
};

export default Login;
