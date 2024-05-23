import { useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import Otp from './Otp';
const ForgotPassword = ({setForgetPass}) => {
    const [OTP,setOTP]=useState(false);
    return ( 
        OTP?(
            <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
              <Otp setOTP={setOTP}/>
              
            </div>
          ):
       (
        <div className="h-[230px] w-[300px] flex flex-col gap-4 bg-white border-solid border-1 border-black p-4 rounded-md">
        <div className=" flex justify-between">
           <div className="flex justify-start gap-2 items-center">
             <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
             <h3 className="font-semibold text-lg ">RAG</h3>
           </div>
           <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={()=> setForgetPass(false)}>X</button>
         </div>
       <h1 className='text-center font-semibold text-lg'>Forgot password?</h1>
       <div className="flex flex-col gap-1">
           <p className='text-sm'>Email Address</p>
           <input type="text" className='border-black border-2 border-solid rounded-md'/>
       </div>
       <button className="text-white bg-blue-400 border-solid border-1 border-blue-700 text-center p-1 rounded-md" onClick={()=> setOTP(true)}>
           Reset password
       </button>

   </div>
       )
     );
}
 
export default ForgotPassword;