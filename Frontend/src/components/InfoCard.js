import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/images/rocket-solid-dark.svg';

const InfoCard = ({setInfo,message,response}) => {
  console.log(`working info ${response}`);
  const navigate = useNavigate();
  const reloadPage = () => {
    navigate(0);
  };
  return (
    <div>
      <div className="h-[200px] w-[300px] flex flex-col gap-4 bg-white border-solid border-1 border-black p-4 rounded-md">
        <div className=" flex justify-between">
          <div className="flex justify-start gap-2 items-center">
            <img src={logo} alt="logo" className="h-[28px] w-[24px]" />
            <h3 className="font-semibold text-lg ">RAG</h3>
          </div>
          {
            response?(
          
            <button
              className="border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white "
              onClick={reloadPage}
            >
              X
            </button>
            
            ):
            (
              <button
            className="border-solid border-2 border-gray-500 bg-gray-600 p-0.25 pl-1 pr-1 rounded-md text-white "
            onClick={() => setInfo(false)}
          >
            X
          </button>
            )
          }
          
        </div>
        <p className='text-center '>{message}</p>
      </div>
    </div>
  );
};

export default InfoCard;
