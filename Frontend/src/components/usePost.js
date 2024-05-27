import { useState } from "react";
import axios from "axios";

const usePost = (url,type) => {
    const [message,setMessage]=useState('');
    const handleSubmit = async (e,formData,state1,state2) => {
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
          if(state2!=null)
            {
                state2(true);
                console.log("state2 working")
            }
            else{
              state1(false);
            }
         
          console.log(state2);
          
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
            handleSubmit

        }
     );
}
 
export default usePost;