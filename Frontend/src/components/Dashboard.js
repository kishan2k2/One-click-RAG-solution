import FileUpload from "./FileUpload";

const Dashboard = () => {
    return ( 
        <div className=" flex flex-col items-center  gap-8  w-[100%] bg-[#030712]  p-2 pt-40 pb-10 border-solid border-b-[1px] border-[#1f2937]">
            <div className="flex flex-col  text-white gap-6 text-left pb-4 ">
                <h1 className="text-white text-5xl  font-semibold ">Unleash the Power of RAG</h1>
                <h3 className="text-[#9ca3af] text-xl ">Easily integrate AI-powered content generation into your applications.</h3>
            </div>

            <div className="bg-[#1f2937] w-[700px]  text-white flex flex-col  p-8 pt-10 pb-10 rounded-md gap-4">
                <div className="flex flex-col  gap-2 text-left ">
                    <h1 className="text-2xl font-semibold">Upload Data</h1>
                    <h3 className="text-lg text-[#9ca3af] ">Start by uploading your PDF files to our secure platform</h3>
                </div>
                <div className="flex justify-center items-center">
                    <FileUpload/>
                </div>
               
            </div>
            <div className="bg-[#1f2937] w-[700px] text-white flex flex-col  p-8 pt-10 pb-10 rounded-md gap-4">
                <h1 className="text-2xl font-semibold">Configure Model</h1>
                <p className="text-base text-[#9ca3af]">Customize your RAG model with sensitivity and temperature controls.</p>
                <div className="flex justify-left items-center gap-40 text-sm">
                    <div className="flex flex-col gap-1">
                        <p>Sensitivity</p>
                        <div className="w-[200px] h-[8px] bg-white rounded-lg"></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>Temperature</p>
                        <div className="w-[200px] h-[8px] bg-white rounded-lg"></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1f2937] w-[700px] text-white flex flex-col  p-8 pt-10 pb-10 rounded-md gap-4">
                <h1 className="text-2xl font-semibold">Retrieve Response</h1>
                <p className="text-base text-[#9ca3af]">Fetch the generated content through our easy-to-use-API</p>
                <div className="bg-[#030712] p-4 flex flex-col rounded-md">
                    <div>
                        <p className="text-white text-base p-2">This is api</p>
                    </div>
                    <div>
                        <textarea name="" id="" placeholder="Enter your prompt.. " className="text-[#9ca3af] rounded-md p-2 text-xs bg-[#030712] w-[90%]"></textarea>
                    </div>

                </div>
                <div>
                <button>Retry Request</button>
                </div>
            </div>

            
        </div>
     );
}
 
export default Dashboard;