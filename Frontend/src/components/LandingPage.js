import "./LandingPage.css";
import file_logo from "../assests/images/file-regular.svg";
import Login from "./Login";
import { useState } from "react";
const LandingPage = () => {
  const [login, setLogin] = useState(false);
  return login ? (
    <div className=" w-[100%] h-screen flex justify-center items-center fixed bg-black/40 backdrop-blur-sm">
      <Login setLogin={setLogin} />
    </div>
  ) : (
    <div className="w-[100%]">
      <div className="flex flex-col justify-center gap-6 w-[100%] bg-[#212121] text-white p-8 items-center pt-32 pb-16 border-solid border-b-2 border-[#1e1e1e] text-center">
        <div className="flex flex-col justify-center items-center text-5xl font-semibold  max-[400px]:text-2xl max-[600px]:w-[100%] max-[800px]:text-3xl max-[1200px]:text-4xl min-[1600px]:text-6xl ">
          <p>Retrieval Augmented Generative </p>
          <p>as Services (RAG) </p>
        </div>
        <div className="text-lg font-normal text-[#9ca3af]  max-[400px]:text-xs max-[600px]:w-[100%] max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl ">
          <p>
            {" "}
            Unlock the power of AI-driven data retrieval and generation with our
            cutting-edge RAG service.
          </p>
        </div>
        <div>
          <div className="flex justify-start gap-4  text-black ">
            <button className="border-solid border-2 rounded-lg border-[#1f2937]   p-2 pl-6 pr-6  bg-white hover:bg-gray-300 text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl">
              {" "}
              Get Started{" "}
            </button>
            <button
              className="border-solid border-2 rounded-lg border-[#1f2937] p-2 pl-6 pr-6 text-[#9ca3af] hover:text-gray-300 hover:border-gray-500 text-lg max-[400px]:text-sm max-[800px]:text-base min-[1600px]:text-xl"
              onClick={() => setLogin(true)}
            >
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 w-[100%]  bg-[#111827] p-4 pt-12 pb-12 border-solid border-b-2 border-[#1f2937]  ">
        <h1 className="text-4xl text-white font-semibold max-[400px]:text-xl max-[800px]:text-2xl max-[1200px]:text-3xl min-[1600px]:text-5xl">Key Features</h1>
        <h3 className="text-xl text-center text-[#747f8c] font-normal max-[400px]:text-sm max-[600px]:text-base max-[1000px]:text-lg min-[1600px]:text-2xl">
          Discover the powerful capabilities of our RAG service.
        </h3>
        <div className=" w-[80%]  flex justify-center items-center gap-8 pt-2  max-[800px]:flex-col max-[800px]:w-[80%]  max-[1000px]:w-[95%] min-[1600px]:w-[70%]">
          <div className="card ">
            <div className="card_img_div">
              <img
                src={file_logo}
                alt="file logo"
                className="h-[25px] w-[25px] max-[400px]:h-[20px] max-[400px]:w-[20px] max-[800px]:h-[22px] max-[800px]:w-[22px] min-[1600px]:h-[28px] min-[1600px]:w-[28px]"
              />
            </div>
            <h1 className="text-white font-semibold text-[22px] leading-[28px]  max-[400px]:text-sm max-[600px]:text-base max-[1000px]:text-lg min-[1600px]:text-2xl" >
              PDF Data Ingestion
            </h1>
            <p className="text-[#788390]  max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl">
              Seamlessly ingest and process PDF data to power your applications.
            </p>
          </div>
          <div className="card m">
            <div className="card_img_div">
              <img
                src={file_logo}
                alt="file logo"
                className="h-[25px] w-[25px] max-[400px]:h-[20px] max-[400px]:w-[20px] max-[800px]:h-[22px] max-[800px]:w-[22px] min-[1600px]:h-[28px] min-[1600px]:w-[28px]"
              />
            </div>
            <h1 className="text-white font-semibold text-[22px] leading-[28px]  max-[400px]:text-sm max-[600px]:text-base max-[1000px]:text-lg min-[1600px]:text-2xl">
              Customizable Parameters
            </h1>
            <p className="text-[#788390] max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl ">
              Adjust sensitivity, temperature, and other parameters to fine-tune
              your RAG responses.
            </p>
          </div>
          <div className="card ">
            <div className="card_img_div">
              <img
                src={file_logo}
                alt="file logo"
                className="h-[25px] w-[25px] max-[400px]:h-[20px] max-[400px]:w-[20px] max-[800px]:h-[22px] max-[800px]:w-[22px] min-[1600px]:h-[28px] min-[1600px]:w-[28px]"
              />
            </div>
            <h1 className="text-white font-semibold text-[22px] leading-[28px]  max-[400px]:text-sm max-[600px]:text-base max-[1000px]:text-lg min-[1600px]:text-2xl">
              API Response Viewer
            </h1>
            <p className="text-[#788390] max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl">
              Easily inspect and validate the responses from the RAG API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
