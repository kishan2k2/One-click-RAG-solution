import { useState } from 'react';
import logo from '../assests/images/rocket-solid.svg';
import InfoCard from './InfoCard';
import usePost from './usePost';

const SignUp = ({ setSignUp}) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [info,setInfo]=useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {message,handleSubmit,response}=usePost('http://127.0.0.1:8000/register/','Sign up');
  function onSubmitFunc(e)
  { 
    // e.preventDefault();
    setInfo(true);
    handleSubmit(e, formData,null,setInfo);
    
  }



  


  return (
    
    info?(
      <div className=' w-screen h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm'>
        <InfoCard setInfo={setInfo} message={message} response={response}/>
      </div>
    ):
  (
    <div className="flex justify-center">
    <div className="bg-[#030712] h-[480px] w-[400px] text-white p-8 rounded-md">
      <div className="flex flex-col gap-4 ">
        <div className=" flex justify-between">
          <div className="flex justify-start gap-2 items-center">
            <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
            <h3 className="font-semibold text-lg ">RAG</h3>
          </div>
          <button className='border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white ' onClick={() => setSignUp(false)}>X</button>
        </div>
        <h1 className="text-center text-xl font-bold">Get Started with RAG</h1>
        <p className="text-center text-[#88a3af]">Sign Up </p>
        <form onSubmit={onSubmitFunc}>
          <div className="bg-[#111827] p-4 rounded-lg mt-2 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="">userName</label>
              <input type="text" className="text-black p-1 rounded-md pl-4" name="userName" value={formData.userName} required onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Email</label>
              <input type="email" className="text-black p-1 rounded-md pl-4" name="email" value={formData.email} required onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Password</label>
              <input type="password" className="text-black p-1 rounded-md pl-4" name="password" value={formData.password} required onChange={handleChange} />
            </div>
            <div className="flex justify-center items-center bg-[#18181b] w-[100%] p-2 rounded-md mt-2 border-solid border-[1px] border-white">
              <button className='font-bold w-[100%]' type='submit' >Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
    
  );
};

export default SignUp;
