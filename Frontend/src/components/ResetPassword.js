import { useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import usePost from './usePost';
import InfoCard from "./InfoCard";
const ResetPassword = ({setResetPass}) => {

  const [password,setPassword]=useState(
    {
      password1: '',
      password2: ''
    }
  );
  const [info,setInfo]=useState(false);
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    
  };

  const {message,handleSubmit,response}=usePost('http://127.0.0.1:8000/resetPass/','Reset Password');
  function onSubmitFunc(e)
  { 
    // e.preventDefault();
    setInfo(true);
    handleSubmit(e, password,setResetPass,setInfo);
    
  }




    return ( 
      info?(
        <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
          <InfoCard setInfo={setInfo} message={message} response={response}/>
        </div>
      ):
      (
        <div className="h-[250px] w-[300px] flex flex-col gap-4 bg-white border-solid border-1 border-black p-4 rounded-md max-[400px]:w-[260px] ">
        <div className=" flex justify-between">
           <div className="flex justify-start gap-2 items-center">
             <img src={logo} alt="logo" className="h-[28px] w-[24px]
              max-[400px]:h-[22px] max-[400px]:w-[20px] max-[800px]:h-[24px] max-[800px]:w-[22px] min-[1600px]:h-[30px] min-[1600px]:w-[26px]" />
             <h3 className="font-semibold text-lg max-[400px]:text-sm max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl ">RAG</h3>
           </div>
           <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={()=> setResetPass(false)}>X</button>
         </div>
       <h1 className='text-center font-semibold text-lg max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl'>Reset account Password</h1>
       
           
        <form className='flex flex-col gap-4' onSubmit={onSubmitFunc}>
        <input type="password" className='border-black border-2 border-solid rounded-md text-xs' placeholder='password' required name='password1' value={password.password1} onChange={handleChange}/>
           <input type="password" className='border-black border-2 border-solid rounded-md text-xs' placeholder='Confirm Password' required name='password2' value={password.password2} onChange={handleChange}/>
     
       <button className="text-white bg-blue-400 border-solid border-1 border-blue-700 text-center p-1 rounded-md max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl " type='submit'>
           Reset password
       </button>
        </form>

   </div>
      )
     );
}
 
export default ResetPassword;