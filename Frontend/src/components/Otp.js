import { useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import ResetPassword from './ResetPassword';
const Otp = ({setOTP}) => {
    const [resetPass,setResetPass]=useState(false);
    return ( 
        resetPass?(
            <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
              <ResetPassword setResetPass={setResetPass}/>
              
            </div>
          ):
        (
            <div className="h-[230px] w-[300px] flex flex-col gap-4 bg-white border-solid border-1 border-black p-4 rounded-md">
        <div className=" flex justify-between">
           <div className="flex justify-start gap-2 items-center">
             <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
             <h3 className="font-semibold text-lg ">RAG</h3>
           </div>
           <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={()=> setOTP(false)}>X</button>
         </div>
       <h1 className='text-center font-semibold text-lg'>Enter the OTP</h1>
       
           
           <input type="text" className='border-black border-2 border-solid rounded-md'/>
     
       <button className="text-white bg-blue-400 border-solid border-1 border-blue-700 text-center p-1 rounded-md" onClick={()=>setResetPass(true)}>
           Submit
       </button>

   </div>
        )
     );
}
 
export default Otp;