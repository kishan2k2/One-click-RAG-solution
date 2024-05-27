import { useState } from 'react';
import logo from '../assests/images/rocket-solid-dark.svg';
import usePost from './usePost';
const ResetPassword = ({setResetPass}) => {

  const [password,setPassword]=useState(
    {
      password1: '',
      password2: ''
    }
  );
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const {message,handleSubmit}=usePost('http://127.0.0.1:8000/resetPass/','Reset Password');
  function onSubmitFunc(e)
  { 
    // e.preventDefault();
    handleSubmit(e, password,setResetPass,null);
    
  }




    return ( 
        <div className="h-[250px] w-[300px] flex flex-col gap-4 bg-white border-solid border-1 border-black p-4 rounded-md">
        <div className=" flex justify-between">
           <div className="flex justify-start gap-2 items-center">
             <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
             <h3 className="font-semibold text-lg ">RAG</h3>
           </div>
           <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={()=> setResetPass(false)}>X</button>
         </div>
       <h1 className='text-center font-semibold text-lg'>Reset account Password</h1>
       
           
        <form className='flex flex-col gap-4' onSubmit={onSubmitFunc}>
        <input type="password" className='border-black border-2 border-solid rounded-md' placeholder='password' required name='password1' value={password.password1} onChange={handleChange}/>
           <input type="password" className='border-black border-2 border-solid rounded-md' placeholder='Confirm Password' required name='password2' value={password.password2} onChange={handleChange}/>
     
       <button className="text-white bg-blue-400 border-solid border-1 border-blue-700 text-center p-1 rounded-md " type='submit'>
           Reset password
       </button>
        </form>

   </div>
     );
}
 
export default ResetPassword;