import { useState } from "react";
import axios from "axios";

const usePost = (url,type) => {
    const res=['User created','Login sucessfull','Email sent','OTP confirmed','The password has been updated']
    const [message,setMessage]=useState('');
    const [response,setresponse]=useState(false);
    const handleSubmit = async (e,formData,state,setInfo) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(url, 
            new URLSearchParams(formData).toString(), // Convert data to form-urlencoded
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
          
          setMessage(response.data.response)
          if(state!=null)
            {
                state(true);
                console.log("state2 working")
            }
            
            res.forEach((item) => {
              if (item === response.data.response) {
                setresponse(true);
                
              }
            });
            
            if(response==false)
              {
                setInfo(true);
              }


         
          console.log(state);
          
          console.log( `${type} successful `, response.data);
          // Handle success: redirect, show success message, etc.
        } catch (error) {
          console.error(` ${type} failed`, error.message);
          console.log(formData)
          // Handle error: show error message, allow retry, etc.
        }
      };
    return ( 
        
        {
            message,
            handleSubmit,
            response


        }
     );
}
 
export default usePost;