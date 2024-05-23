import { useEffect, useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
const Login = ({setLogin}) => {
  const[signUp,setSignUp]=useState(false);
  const[forgotPass,setForgotPass]=useState(false);

  function handleClick()
  {
    console.log("before setlogin");
    // setLogin(false);
    console.log("after setlogin"); 
    setSignUp(true);
    console.log("after setSignUp");
   
  }

 
  return (

    signUp?(
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
        <SignUp setSignUp={setSignUp}/>
      </div>
    ):
    forgotPass?
    (
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
      <ForgotPassword setForgetPass={setForgotPass}/>
    </div>
    ):
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
              <form action="">
                <div className="flex flex-col gap-2 justify-center items-center bg-[#111827] text-white p-4 rounded-xl">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="">Name</label>
                    <input type="text" className="rounded-md text-black  pl-2 pr-2 "  placeholder='Enter your name'/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Password</label>
                    <input type="password" className="rounded-md  text-black  pl-2 pr-2 "  placeholder='Enter a password'/>
                    <button className='text-white text-[12px] ml-24 ' onClick={()=> setForgotPass(true)}>forget password?</button>
                  </div>
                  <div className='w-[90%] bg-gray-300 rounded-md flex justify-center mt-2 p-1'>
                    <button type="submit" className='text-[#18181b] font-semibold'>Login</button>
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
    )
  
  );
};

export default Login;
