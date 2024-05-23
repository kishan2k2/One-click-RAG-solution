import logo from '../assests/images/rocket-solid-dark.svg';
const ResetPassword = ({setResetPass}) => {
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
       
           
           <input type="password" className='border-black border-2 border-solid rounded-md' placeholder='password'/>
           <input type="password" className='border-black border-2 border-solid rounded-md' placeholder='Confirm Password'/>
     
       <button className="text-white bg-blue-400 border-solid border-1 border-blue-700 text-center p-1 rounded-md">
           Reset password
       </button>

   </div>
     );
}
 
export default ResetPassword;