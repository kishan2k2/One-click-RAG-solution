import { useEffect, useState } from "react";
import logo from "../assests/images/rocket-solid.svg";
import { Outlet, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";


const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  // const [loginStatus,setLoginStatus]=useState(false);

  // useEffect(()=>
  // {
  //   console.log("under use effect");

  //   const checkLoginStatus=async()=> {
  //     console.log("working check login")
  //     try{
  //         const response=await axios.get('https://one-click-rag-solution.onrender.com/loggedin/');
  //         console.log(response.data.response);
  //         if(response.data.response=='Not logged in')
  //           {
  //             setLoginStatus(false);
  //             console.log("it is false login status")
  //           }
  //         else{
  //           setLoginStatus(true);
  //           console.log("it is true login status")
  //         }
  //     }
  //     catch (error) {
  //       console.error(error.message);
  //       console.log("it is error block");
  //     }
  //   };
  //   checkLoginStatus();


  // },[])

  
  const [status, setStatus] = useState('Checking login status...');
  useEffect(()=>
  {
      console.log("under useeffect")
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://one-click-rag-solution.onrender.com/loggedin/', { withCredentials: true });
        setStatus(response.data.response);
        console.log(`it is checkLogin ${response.data.response}`);
      } catch (error) {
        console.error('Error fetching login status', error);
        setStatus('Error fetching login status');
      }
    };

    checkLoginStatus();
  },[]);



  return (
    <nav>
      <div className=" flex justify-between fixed bg-[#030712] w-[100%] text-white items-center font-medium p-4 border-solid border-b-2 border-[#1f2937]">
        <div className="flex justify-start gap-4 items-center ">
          <button>
            <Link to="/">
              <div className="flex justify-start gap-2 items-center ">
                <img src={logo} alt="logo" className="h-[25px] max-[400px]:h-[20px] max-[800px]:h-[22px] min-[1600px]:h-[28px]   " />
                <h3 className="font-semibold text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl  ">
                  RAG
                </h3>
              </div>
            </Link>
          </button>

          <button>
            <Link to="/dashboard">
              <h3 className="font-semibold text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl">
                Dashboard
              </h3>
            </Link>
          </button>
        </div>
        <div className="flex justify-start gap-4">
          <button onClick={() => setLogin(true)} className="font-semibold text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl">Login</button>
          <button onClick={() => setSignUp(true)} className="font-semibold text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl">Sign Up</button>
          <button className="font-semibold text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl">Profile</button>
        </div>
      </div>

      {login ? (
        <div className=" w-[100%] h-screen flex justify-center items-center fixed bg-black/40 backdrop-blur-sm">
          <Login setLogin={setLogin} />
        </div>
      ) : (
        ""
      )}
      
      {signUp ? (
        <div className=" w-[100%] h-screen flex justify-center items-center fixed bg-white/20 backdrop-blur-sm">
          <SignUp setSignUp={setSignUp} />
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
