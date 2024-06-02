import { useEffect, useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword'
import axios from 'axios';
import usePost from './usePost';
import InfoCard from './InfoCard';
const Login = ({setLogin}) => {
  const[signUp,setSignUp]=useState(false);
  const [info,setInfo]=useState(false);
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
    // setLogin(false);
   
   
  }

  const {message,handleSubmit,response}=usePost('https://one-click-rag-solution.onrender.com/login/','Login');
  function onSubmitFunc(e)
  { 
    // e.preventDefault();
    setInfo(true);
    handleSubmit(e, loginData,null,setInfo);
    
  }



 
  return (

    info?(
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
        <InfoCard setInfo={setInfo} message={message} response={response}/>
      </div>
    ):
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
    
                
            
      <div className="flex justify-center w-[300px] h-[430px]  border-solid border-2 border-gray-800  rounded-md min-[1600px]:h-[450px] max-[800px]:w-[270px] max-[400px]:w-[250px]">
            <div className="flex flex-col gap-6 w-[100%] h-[100%] text-[#111827] p-6 bg-white rounded-md ">
              <div className=" flex justify-between">
                <div className="flex justify-start gap-2 items-center">
                  <img src={logo} alt="logo" className="h-[28px] w-[24px]
                  max-[400px]:h-[22px] max-[400px]:w-[20px] max-[800px]:h-[24px] max-[800px]:w-[22px] min-[1600px]:h-[30px] min-[1600px]:w-[26px]" />
                  <h3 className="font-semibold text-lg max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl">RAG</h3>
                </div>
                <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl' onClick={()=> setLogin(false)}>X</button>
              </div>
              <div className="font-bold text-xl flex flex-col justify-center items-center">
                <p className='italic text-lg max-[400px]:text-sm max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl'>Hello</p>
                <p className='text-lg max-[400px]:text-sm max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl'>Welcome!</p>
              </div>
              <form  onSubmit={onSubmitFunc}>
                <div className="flex flex-col gap-2 justify-center items-center bg-[#111827] text-white p-4 rounded-xl">
                  <div className="flex flex-col gap-1 w-[100%] ">
                    <label htmlFor="" className="text-base max-[400px]:text-sm min-[1600px]:text-lg">userName</label>
                    <input type="text" className="rounded-md text-black  p-1 text-xs  "  placeholder='Enter your name' name='userName' value={loginData.userName} required onChange={handleChange}/>
                  </div>
                  <div className="flex flex-col gap-1 w-[100%]">
                    <label htmlFor="" className="text-base max-[400px]:text-sm min-[1600px]:text-lg">Password</label>
                    <input type="password" className="rounded-md  text-black p-1   text-xs "  placeholder='Enter a password' name='password' value={loginData.password} required onChange={handleChange}/>
                    <button className='text-white text-right text-[12px] ml-18 max-[400px]:text-xs max-[800px]:text-sm  min-[1600px]:text-sm' onClick={()=> setForgotPass(true)}>forget password?</button>
                  </div>

                  <div className='w-[90%] bg-gray-300 rounded-md flex justify-center mt-2 p-1'>
                    <button type="submit" className='text-[#18181b]  text-base font-semibold w-[100%] max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl'>Login</button>
                  </div>
                 
                </div>
              </form>
              <div className='flex justify-center gap-1 text-[#18181b] mt-[-8px] text-sm'>
                      <p className=' text-base max-[400px]:text-xs max-[800px]:text-sm min-[1600px]:text-base' >Don't have an account? </p>
                      <button className='font-semibold  text-base max-[400px]:text-xs max-[800px]:text-sm min-[1600px]:text-base' onClick={handleClick} >Sign Up</button>
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
