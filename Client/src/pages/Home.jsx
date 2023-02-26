import React ,{useEffect, useState} from 'react';


export default function App() {

    const [message, setMessage] = useState('');
    const [data, setData] = useState({mess:''});
    const handleMessageChage= (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            message })
        });

        const res = await response.json();
        console.log(res)
      }

    

      
    return (
        <div>
            {/* title bar */}
            <div className=" w-full shadow-lg  py-4">
                <div className="flex flex-row">
                    <div className="pl-4 font-bold text-2xl">Learn</div>
                    <div className=" font-bold text-2xl text-[#4169E1] ">Tuber</div>
                </div>
            </div>

            {/* Main heading */}

            <div className=" flex justify-center items-center pt-6">
                <div className="flex flex-row">
                    <div className="pl-4 font-bold text-2xl">Learn</div>
                    <div className=" font-bold text-2xl text-[#4169E1] ">Tuber</div>
                </div>            
            </div>
            <div className='text-center text-xl'>
                AI Powered Transcriber, Summarization ,Quiz Generator
            </div>

            <div className="flex justify-center items-center pt-2 ">
                <div className="w-full max-w-md px-4 py-6 bg-slate-300 shadow-md rounded-md">
                    
                    
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center">

                        <input
                        type='text'
                        value={message}
                        onChange={handleMessageChage}
                        className="rounded-md bg-gray-100 py-2 px-4 w-full "
                        />
                    </div>
                    <div className="flex justify-center pt-4">
                        <button className="text-center bg-indigo-500 w-28 h-10 text-white rounded "
                                type='submit'>
                            Summarize
                        </button>

                        <div> {data.mess}</div>
                        
                    </div>
                 </form>
                
                </div>
                </div>
           </div>
      
    )
  }